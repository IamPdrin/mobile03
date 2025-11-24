import { StyleSheet} from 'react-native';

const estilos = StyleSheet.create({
    //Layout Principal
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 15,
        paddingVertical: 10,
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

    //  VIAGENS

    // Tela de Registro de Viagem
    telaViagemContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    mapContainer: {
        height: 250,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },

    mapText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        paddingHorizontal: 10,
    },

    coordenadas: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10,
        textAlign: "center",
    },

    cameraPreview: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginBottom: 15,
    },

    inputViajem: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: "#f9f9f9",
    },

    labelViajem: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
    },

    botaoCapturar: {
        backgroundColor: "#FF6B6B",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
        marginHorizontal: 15,
        alignItems: "center",
    },

    botaoRegistrar: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
        marginHorizontal: 15,
        alignItems: "center",
    },

    botaoCancelar: {
        backgroundColor: "#999",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginHorizontal: 15,
        alignItems: "center",
    },

    // Lista de Viagens
    listaViagensContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    viagemCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 15,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    viagemFoto: {
        width: "100%",
        height: 200,
        backgroundColor: "#f0f0f0",
    },

    viagemInfoContainer: {
        padding: 12,
    },

    viagemNome: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },

    viagemLocal: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },

    viagemData: {
        fontSize: 13,
        color: "#999",
        marginBottom: 5,
    },

    viagemCoordenadas: {
        fontSize: 12,
        color: "#999",
        marginBottom: 10,
    },

    botaoDeletarViagem: {
        backgroundColor: "#FF6B6B",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 6,
        alignItems: "center",
    },

    textoBotaoDeletar: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },

    viagensVazias: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    textVagensVazias: {
        fontSize: 16,
        color: "#999",
        textAlign: "center",
    },

    // Componente de Mapa
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },

    header: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#f5f5f5",
    },

    email: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },

    card: {
        marginHorizontal: 15,
        marginBottom: 15,
        paddingHorizontal: 0,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        overflow: "hidden",
    },

    cardRecurso: {
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },

    cardTitulo: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },

    secaoTitulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginHorizontal: 15,
        marginTop: 20,
        marginBottom: 10,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    cardTexto: {
        flex: 1,
    },

    cardDescricao: {
        fontSize: 13,
        color: "#666",
    },

    icone: {
        fontSize: 32,
        marginRight: 12,
    },

    iconeInicio: {
        fontSize: 30,
        marginBottom: 20,
    },

    semEventos: {
        fontSize: 14,
        color: "#999",
        textAlign: "center",
        marginVertical: 16,
    },

});

export default estilos;