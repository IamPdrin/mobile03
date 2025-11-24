import * as Camera from 'expo-camera';
import * as Location from 'expo-location';
import * as Calendar from 'expo-calendar';
// ...existing code...

// Tipos de permissões
export interface PermissoesStatus {
  camera: boolean;
  localizacao: boolean;
  calendario: boolean;
  galeria: boolean;
}

// Interface para dados integrados
export interface DadosIntegrados {
  localizacao?: Location.LocationObject;
  eventoCalendario?: string;
  fotoCamera?: string;
  timestamp: Date;
}

// ============ GERENCIADOR DE PERMISSÕES ============

export class GerenciadorPermissoes {
  /**
   * Solicita permissão da câmera (funciona através do componente Camera.tsx)
   */
  static async solicitarPermissaoCamera(): Promise<boolean> {
    try {
      // A permissão é solicitada automaticamente no componente Camera.tsx
      return true;
    } catch (erro) {
      console.error('Erro ao solicitar permissão da câmera:', erro);
      return false;
    }
  }

  /**
   * Solicita permissão de localização
   */
  static async solicitarPermissaoLocalizacao(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (erro) {
      console.error('Erro ao solicitar permissão de localização:', erro);
      return false;
    }
  }

  /**
   * Solicita permissão de localização em background
   */
  static async solicitarPermissaoLocalizacaoBackground(): Promise<boolean> {
    try {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      return status === 'granted';
    } catch (erro) {
      console.error('Erro ao solicitar permissão de localização em background:', erro);
      return false;
    }
  }

  /**
   * Solicita permissão do calendário
   */
  static async solicitarPermissaoCalendario(): Promise<boolean> {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      return status === 'granted';
    } catch (erro) {
      console.error('Erro ao solicitar permissão do calendário:', erro);
      return false;
    }
  }

  /**
   * Solicita permissão de galeria (Media Library)
   */
  static async solicitarPermissaoGaleria(): Promise<boolean> {
    try {
      // ...existing code...
      return permissao.granted;
    } catch (erro) {
      console.error('Erro ao solicitar permissão de galeria:', erro);
      return false;
    }
  }

  /**
   * Solicita todas as permissões necessárias
   */
  static async solicitarTodasPermissoes(): Promise<PermissoesStatus> {
    const [camera, localizacao, calendario, galeria] = await Promise.all([
      this.solicitarPermissaoCamera(),
      this.solicitarPermissaoLocalizacao(),
      this.solicitarPermissaoCalendario(),
      this.solicitarPermissaoGaleria(),
    ]);

    return {
      camera,
      localizacao,
      calendario,
      galeria,
    };
  }

  /**
   * Verifica status de todas as permissões
   */
  static async verificarPermissoes(): Promise<PermissoesStatus> {
    try {
      const [localizacaoStatus, calendarioStatus] =
        await Promise.all([
          Location.getForegroundPermissionsAsync(),
          Calendar.getCalendarPermissionsAsync(),
        ]);

      return {
        camera: true, // Verificado no componente Camera.tsx
        localizacao: localizacaoStatus.status === 'granted',
        calendario: calendarioStatus.status === 'granted',
        galeria: true, // sempre true, pois não é mais usada
      };
    } catch (erro) {
      console.error('Erro ao verificar permissões:', erro);
      return {
        camera: false,
        localizacao: false,
        calendario: false,
        galeria: false,
      };
    }
  }
}

// ============ GERENCIADOR DE INTEGRAÇÃO ============

export class GerenciadorIntegrado {
  /**
   * Cria um evento no calendário e salva localização e foto
   */
  static async criarEventoIntegrado(
    titulo: string,
    descricao: string,
    fotoUri?: string
  ): Promise<DadosIntegrados | null> {
    try {
      const timestamp = new Date();
      const dados: DadosIntegrados = {
        timestamp,
      };

      // 1. Obter localização atual
      try {
        const localizacao = await Location.getCurrentPositionAsync({});
        dados.localizacao = localizacao;
        console.log('Localização obtida:', localizacao.coords);
      } catch (erro) {
        console.error('Erro ao obter localização:', erro);
      }

      // 2. Criar evento no calendário
      try {
        const calendarios = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        if (calendarios.length > 0) {
          const idCalendario = calendarios[0].id;
          const dataFim = new Date(timestamp);
          dataFim.setHours(dataFim.getHours() + 1);

          const idEvento = await Calendar.createEventAsync(idCalendario, {
            title: titulo,
            startDate: timestamp,
            endDate: dataFim,
            notes: descricao,
            location: dados.localizacao
              ? `Lat: ${dados.localizacao.coords.latitude}, Lon: ${dados.localizacao.coords.longitude}`
              : 'Localização não disponível',
            timeZone: 'America/Sao_Paulo',
          });

          dados.eventoCalendario = idEvento;
          console.log('Evento criado:', idEvento);
        }
      } catch (erro) {
        console.error('Erro ao criar evento:', erro);
      }

      // 3. Salvar foto se fornecida
      if (fotoUri) {
        try {
          // ...existing code...
          dados.fotoCamera = fotoUri;
          console.log('Foto salva:', fotoUri);
        } catch (erro) {
          console.error('Erro ao salvar foto:', erro);
        }
      }

      return dados;
    } catch (erro) {
      console.error('Erro ao criar evento integrado:', erro);
      return null;
    }
  }

  /**
   * Obter todos os eventos do calendário
   */
  static async obterEventosCalendario(dias: number = 30): Promise<any[]> {
    try {
      const calendarios = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      if (calendarios.length === 0) return [];

      const hoje = new Date();
      const futuro = new Date(hoje.getTime() + dias * 24 * 60 * 60 * 1000);

      const eventos = await Calendar.getEventsAsync(
        [calendarios[0].id],
        hoje,
        futuro
      );

      return eventos;
    } catch (erro) {
      console.error('Erro ao obter eventos:', erro);
      return [];
    }
  }

  /**
   * Rastrear localização em tempo real com callback
   */
  static async rastrearLocalizacao(
    callback: (localizacao: Location.LocationObject) => void
  ): Promise<Location.LocationSubscription | null> {
    try {
      const assinatura = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5, // Atualiza a cada 5 metros
        },
        callback
      );

      return assinatura;
    } catch (erro) {
      console.error('Erro ao rastrear localização:', erro);
      return null;
    }
  }

  /**
   * Parar rastreamento de localização
   */
  static pararRastreamento(assinatura: Location.LocationSubscription | null): void {
    if (assinatura) {
      assinatura.remove();
    }
  }
}

// ============ TIPOS PARA DADOS PERSISTIDOS ============

export interface EventoIntegrado {
  id: string;
  titulo: string;
  descricao: string;
  localizacao: {
    latitude: number;
    longitude: number;
    precisao: number;
  };
  fotoUri?: string;
  dataCalendario: string;
  criadoEm: Date;
}
