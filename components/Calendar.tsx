import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CalendarComponentProps {
  visible: boolean;
  onClose: () => void;
  onDateSelected?: (dateString: string) => void;
}

export default function CalendarComponent({ visible, onClose, onDateSelected }: CalendarComponentProps) {
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);

  const handleConfirmar = () => {
    if (onDateSelected) {
      onDateSelected(dataSelecionada.toISOString());
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={estilos.modalContainer}>
        <View style={estilos.contentContainer}>
          <Text style={estilos.titulo}>Selecione a data do evento</Text>
          {Platform.OS === 'android' ? (
            <Button title="Escolher Data" onPress={() => setMostrarPicker(true)} />
          ) : null}
          {(mostrarPicker || Platform.OS === 'ios') && (
            <DateTimePicker
              value={dataSelecionada}
              mode="date"
              display="default"
              onChange={(event, date) => {
                if (date) setDataSelecionada(date);
                if (Platform.OS === 'android') setMostrarPicker(false);
              }}
            />
          )}
          <View style={estilos.botoesArea}>
            <Button title="Confirmar" onPress={handleConfirmar} color="#007AFF" />
            <Button title="Cancelar" onPress={onClose} color="#ff4444" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contentContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '85%',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  botoesArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    width: '100%',
  },
});
