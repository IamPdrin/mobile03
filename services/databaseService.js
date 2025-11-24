import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, firestore } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, query, collection, where, getDocs, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const db = SQLite.openDatabaseSync('usuarios.db');

// Inicializar banco de dados SQLite
export const inicializarBancoDados = async () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    db.execSync(`
      CREATE TABLE IF NOT EXISTS viagens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        local TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        foto_uri TEXT,
        data_viagem DATE NOT NULL,
        nome_local TEXT,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(email) REFERENCES usuarios(email)
      );
    `);
  } catch (error) {
    console.log('Erro ao inicializar banco de dados:', error);
  }
};

// Obter tipo de armazenamento (local ou remoto)
export const obterTipoArmazenamento = async () => {
  try {
    const tipo = await AsyncStorage.getItem('tipoArmazenamento');
    return tipo || 'local'; // padrão é local
  } catch (error) {
    console.log('Erro ao obter tipo de armazenamento:', error);
    return 'local';
  }
};

// Alterar tipo de armazenamento
export const alterarTipoArmazenamento = async (tipo) => {
  try {
    if (tipo === 'local' || tipo === 'remoto') {
      await AsyncStorage.setItem('tipoArmazenamento', tipo);
      return true;
    }
    return false;
  } catch (error) {
    console.log('Erro ao alterar tipo de armazenamento:', error);
    return false;
  }
};

// ============ OPERAÇÕES SQLite (Local) ============

// Cadastrar usuário no SQLite
export const cadastrarUsuarioLocal = async (email, senha) => {
  try {
    db.runSync(
      'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
      [email, senha]
    );
    return { sucesso: true, mensagem: 'Usuário cadastrado localmente' };
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return { sucesso: false, mensagem: 'E-mail já cadastrado' };
    }
    console.log('Erro ao cadastrar usuário local:', error);
    return { sucesso: false, mensagem: 'Erro ao cadastrar usuário' };
  }
};

// Verificar login no SQLite
export const verificarLoginLocal = async (email, senha) => {
  try {
    const resultado = db.getAllSync(
      'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
      [email, senha]
    );
    return resultado && resultado.length > 0;
  } catch (error) {
    console.log('Erro ao verificar login local:', error);
    return false;
  }
};

// Obter usuário local
export const obterUsuarioLocal = async (email) => {
  try {
    const resultado = db.getAllSync(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return resultado.length > 0 ? resultado[0] : null;
  } catch (error) {
    console.log('Erro ao obter usuário local:', error);
    return null;
  }
};

// Atualizar usuário local
export const atualizarUsuarioLocal = async (email, dados) => {
  try {
    const campos = Object.keys(dados)
      .map(campo => `${campo} = ?`)
      .join(', ');
    const valores = Object.values(dados);
    
    db.runSync(
      `UPDATE usuarios SET ${campos} WHERE email = ?`,
      [...valores, email]
    );
    return { sucesso: true, mensagem: 'Usuário atualizado' };
  } catch (error) {
    console.log('Erro ao atualizar usuário local:', error);
    return { sucesso: false, mensagem: 'Erro ao atualizar usuário' };
  }
};

// Deletar usuário local
export const deletarUsuarioLocal = async (email) => {
  try {
    db.runSync('DELETE FROM usuarios WHERE email = ?', [email]);
    return { sucesso: true, mensagem: 'Usuário deletado' };
  } catch (error) {
    console.log('Erro ao deletar usuário local:', error);
    return { sucesso: false, mensagem: 'Erro ao deletar usuário' };
  }
};

// ============ OPERAÇÕES Remoto (Firebase Auth + Firestore) ============

// Cadastrar usuário remotamente com Firebase Auth + Firestore
export const cadastrarUsuarioRemoto = async (email, senha, extra = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = userCredential.user.uid;

    const userRef = doc(firestore, 'usuarios', uid);
    await setDoc(userRef, {
      email,
      criado_em: serverTimestamp(),
      ...extra
    });

    return { sucesso: true, mensagem: 'Usuário cadastrado remotamente', uid };
  } catch (error) {
    console.log('Erro ao cadastrar usuário remoto:', error);
    const code = error.code || '';
    if (code.includes('email-already-in-use')) {
      return { sucesso: false, mensagem: 'E-mail já cadastrado' };
    }
    if (code.includes('weak-password')) {
      return { sucesso: false, mensagem: 'Senha muito fraca' };
    }
    return { sucesso: false, mensagem: error.message || 'Erro ao cadastrar usuário' };
  }
};

// Verificar login remotamente com Firebase Auth
export const verificarLoginRemoto = async (email, senha) => {
  try {
    await signInWithEmailAndPassword(auth, email, senha);
    return true;
  } catch (error) {
    console.log('Erro ao verificar login remoto:', error);
    return false;
  }
};

// Obter usuário remoto (consulta por email)
export const obterUsuarioRemoto = async (email) => {
  try {
    const q = query(collection(firestore, 'usuarios'), where('email', '==', email));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const doc0 = snap.docs[0];
      return { id: doc0.id, ...doc0.data() };
    }
    return null;
  } catch (error) {
    console.log('Erro ao obter usuário remoto:', error);
    return null;
  }
};

// Atualizar usuário remoto (consulta por email)
export const atualizarUsuarioRemoto = async (email, dados) => {
  try {
    const q = query(collection(firestore, 'usuarios'), where('email', '==', email));
    const snap = await getDocs(q);
    if (snap.empty) {
      return { sucesso: false, mensagem: 'Usuário não encontrado' };
    }
    const docRef = snap.docs[0].ref;
    await updateDoc(docRef, dados);
    return { sucesso: true, mensagem: 'Usuário atualizado' };
  } catch (error) {
    console.log('Erro ao atualizar usuário remoto:', error);
    return { sucesso: false, mensagem: 'Erro ao atualizar usuário' };
  }
};

// Deletar usuário remoto (apenas documento Firestore)
export const deletarUsuarioRemoto = async (email) => {
  try {
    const q = query(collection(firestore, 'usuarios'), where('email', '==', email));
    const snap = await getDocs(q);
    if (snap.empty) {
      return { sucesso: false, mensagem: 'Usuário não encontrado' };
    }
    const docRef = snap.docs[0].ref;
    await deleteDoc(docRef);
    return { sucesso: true, mensagem: 'Usuário deletado' };
  } catch (error) {
    console.log('Erro ao deletar usuário remoto:', error);
    return { sucesso: false, mensagem: 'Erro ao deletar usuário' };
  }
};

// ============ OPERAÇÕES Genéricas (detectam o tipo automaticamente) ============

export const cadastrarUsuario = async (email, senha) => {
  const tipo = await obterTipoArmazenamento();
  return tipo === 'remoto' 
    ? cadastrarUsuarioRemoto(email, senha)
    : cadastrarUsuarioLocal(email, senha);
};

export const verificarLogin = async (email, senha) => {
  const tipo = await obterTipoArmazenamento();
  return tipo === 'remoto'
    ? verificarLoginRemoto(email, senha)
    : verificarLoginLocal(email, senha);
};

export const obterUsuario = async (email) => {
  const tipo = await obterTipoArmazenamento();
  return tipo === 'remoto'
    ? obterUsuarioRemoto(email)
    : obterUsuarioLocal(email);
};

export const atualizarUsuario = async (email, dados) => {
  const tipo = await obterTipoArmazenamento();
  return tipo === 'remoto'
    ? atualizarUsuarioRemoto(email, dados)
    : atualizarUsuarioLocal(email, dados);
};

export const deletarUsuario = async (email) => {
  const tipo = await obterTipoArmazenamento();
  return tipo === 'remoto'
    ? deletarUsuarioRemoto(email)
    : deletarUsuarioLocal(email);
};

// ============ OPERAÇÕES DE VIAGENS (Local) ============

// Registrar nova viagem
export const registrarViagemLocal = async (email, local, latitude, longitude, fotoUri, dataViagem, nomeLocal) => {
  try {
    db.runSync(
      `INSERT INTO viagens (email, local, latitude, longitude, foto_uri, data_viagem, nome_local) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, local, latitude, longitude, fotoUri, dataViagem, nomeLocal]
    );
    return { sucesso: true, mensagem: 'Viagem registrada com sucesso' };
  } catch (error) {
    console.log('Erro ao registrar viagem:', error);
    return { sucesso: false, mensagem: 'Erro ao registrar viagem' };
  }
};

// Obter viagens do usuário
export const obterViagensLocal = async (email) => {
  try {
    const viagens = db.getAllSync(
      'SELECT * FROM viagens WHERE email = ? ORDER BY data_viagem DESC',
      [email]
    );
    return viagens || [];
  } catch (error) {
    console.log('Erro ao obter viagens:', error);
    return [];
  }
};

// Deletar viagem
export const deletarViagemLocal = async (id) => {
  try {
    db.runSync('DELETE FROM viagens WHERE id = ?', [id]);
    return { sucesso: true, mensagem: 'Viagem deletada' };
  } catch (error) {
    console.log('Erro ao deletar viagem:', error);
    return { sucesso: false, mensagem: 'Erro ao deletar viagem' };
  }
};

// ============ OPERAÇÕES DE VIAGENS (Remoto - Firebase) ============

export const registrarViagemRemoto = async (email, local, latitude, longitude, fotoUri, dataViagem, nomeLocal) => {
  try {
    const docRef = doc(firestore, 'viagens', `${email}_${Date.now()}`);
    await setDoc(docRef, {
      email,
      local,
      latitude,
      longitude,
      foto_uri: fotoUri,
      data_viagem: dataViagem,
      nome_local: nomeLocal,
      criado_em: serverTimestamp()
    });
    return { sucesso: true, mensagem: 'Viagem registrada com sucesso' };
  } catch (error) {
    console.log('Erro ao registrar viagem remoto:', error);
    return { sucesso: false, mensagem: 'Erro ao registrar viagem' };
  }
};

export const obterViagensRemoto = async (email) => {
  try {
    const q = query(collection(firestore, 'viagens'), where('email', '==', email));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.log('Erro ao obter viagens remoto:', error);
    return [];
  }
};

export const deletarViagemRemoto = async (viagemId) => {
  try {
    await deleteDoc(doc(firestore, 'viagens', viagemId));
    return { sucesso: true, mensagem: 'Viagem deletada' };
  } catch (error) {
    console.log('Erro ao deletar viagem remoto:', error);
    return { sucesso: false, mensagem: 'Erro ao deletar viagem' };
  }
};

// ============ OPERAÇÕES DE VIAGENS (Genéricas) ============

export const registrarViagem = async (email, local, latitude, longitude, fotoUri, dataViagem, nomeLocal) => {
  const tipo = await obterTipoArmazenamento();
  return tipo === 'remoto'
    ? registrarViagemRemoto(email, local, latitude, longitude, fotoUri, dataViagem, nomeLocal)
    : registrarViagemLocal(email, local, latitude, longitude, fotoUri, dataViagem, nomeLocal);
};

export const obterViagens = async (email) => {
  const tipo = await obterTipoArmazenamento();
  return tipo === 'remoto'
    ? obterViagensRemoto(email)
    : obterViagensLocal(email);
};

export const deletarViagem = async (id) => {
  const tipo = await obterTipoArmazenamento();
  return tipo === 'remoto'
    ? deletarViagemRemoto(id)
    : deletarViagemLocal(id);
};
