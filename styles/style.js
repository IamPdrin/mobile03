import { StyleSheet} from 'react-native';

const estilos = StyleSheet.create({
    //Layout Principal
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titulo: {
        color: '#000000ff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 50,
    },

    // Entrada de dados
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        width: '80%',
        borderRadius: 10,
    },


    // Botão
    botao: {
        backgroundColor: '#000000ff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },

    textoBotao: {
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    botaoSair: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    
    textoBotaoSair: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    // Card
    card: {
        flex: 1,
        width: '100%',
        padding: 10,
        backgroundColor: '#f5f5f5',
    },

    itemCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },

    imageCard: {
        width: 200,
        height: 240,
        borderRadius: 10,
        marginBottom: 10,
    },

    // Detalhes
    containerDetalhe: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    imageDetalhe: {
        width: "100%",
        height: 280,
        backgroundColor: "#f5f5f5",
        marginTop: 50,
    },

    conteudoDetalhe: {
        padding: 16,
    },

    tituloDetalhe: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    precoDetalhe: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#4CAF50",
        marginBottom: 20,
    },

    tituloSecao: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 5,
    },

    descricaoDetalhe: {
        fontSize: 15,
        lineHeight: 22,
        color: "#444",
    },

    // Botão de alternância de armazenamento
    botaoAlternar: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 2,
    },

    botaoAlternarLocal: {
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
    },

    botaoAlternarRemoto: {
        backgroundColor: "#2196F3",
        borderColor: "#1976D2",
    },

    textoBotaoAlternar: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 12,
    },

});

export default estilos;