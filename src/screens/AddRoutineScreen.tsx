import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoutines } from '../context/RoutineContext';

export default function AddRoutineScreen({ navigation, route }: any) {

    const { routines, addRoutine, updateRoutine } = useRoutines();

    const idToEdit = route.params?.id;

    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [durationString, setDurationString] = useState('');

    useEffect(() => {
        if (idToEdit) {
            const routineToEdit = routines.find(
                routine => routine.id === idToEdit
            );

            if (routineToEdit) {
                setName(routineToEdit.name);
                setMuscleGroup(routineToEdit.muscleGroup);
                setDurationString(routineToEdit.duration.toString());
            }
        }
    }, [idToEdit, routines]);

    const handleSave = () => {

        if (
            name.trim() === '' ||
            muscleGroup.trim() === '' ||
            durationString.trim() === ''
        ) {
            Alert.alert(
                'Datos incompletos',
                'Por favor completa todos los campos.'
            );
            return;
        }

        const durationNumber = parseFloat(durationString);

        if (isNaN(durationNumber)) {
            Alert.alert(
                'Duración inválida',
                'La duración debe ser un número.'
            );
            return;
        }

        if (durationNumber <= 0) {
            Alert.alert(
                'Duración inválida',
                'La duración debe ser mayor a 0 minutos.'
            );
            return;
        }

        if (idToEdit) {

            updateRoutine(idToEdit, {
                name: name.trim(),
                muscleGroup: muscleGroup.trim(),
                duration: durationNumber,

                // Conservamos si la rutina ya estaba destacada
                featured:
                    routines.find(
                        routine => routine.id === idToEdit
                    )?.featured ?? false,
            });

        } else {

            addRoutine({
                name: name.trim(),
                muscleGroup: muscleGroup.trim(),
                duration: durationNumber,

                // Toda nueva rutina comienza sin destacar
                featured: false,
            });
        }

        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >

                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name="barbell-outline"
                                size={32}
                                color="#FFFFFF"
                            />
                        </View>

                        <Text style={styles.title}>
                            {idToEdit ? 'Editar rutina' : 'Nueva rutina'}
                        </Text>

                        <Text style={styles.subtitle}>
                            {idToEdit
                                ? 'Actualiza los datos de tu entrenamiento'
                                : 'Crea una nueva rutina de entrenamiento'}
                        </Text>
                    </View>

                    <View style={styles.formCard}>

                        <Text style={styles.label}>
                            Nombre de la rutina
                        </Text>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="create-outline"
                                size={20}
                                color="#D90429"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Ej. Pecho y Tríceps"
                                placeholderTextColor="#999"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <Text style={styles.label}>
                            Grupo muscular
                        </Text>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="fitness-outline"
                                size={20}
                                color="#D90429"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Ej. Pecho"
                                placeholderTextColor="#999"
                                value={muscleGroup}
                                onChangeText={setMuscleGroup}
                            />
                        </View>

                        <Text style={styles.label}>
                            Duración en minutos
                        </Text>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="time-outline"
                                size={20}
                                color="#D90429"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Ej. 45"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                value={durationString}
                                onChangeText={setDurationString}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                            activeOpacity={0.8}
                        >
                            <Ionicons
                                name={idToEdit ? 'checkmark-circle-outline' : 'add-circle-outline'}
                                size={22}
                                color="#FFFFFF"
                            />

                            <Text style={styles.saveButtonText}>
                                {idToEdit
                                    ? 'Guardar cambios'
                                    : 'Crear rutina'}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.tipCard}>

                        <Ionicons
                            name="bulb-outline"
                            size={24}
                            color="#D90429"
                        />

                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>
                                Consejo GymPro
                            </Text>

                            <Text style={styles.tipText}>
                                Mantén tus rutinas organizadas para llevar
                                un mejor seguimiento de tus entrenamientos.
                            </Text>
                        </View>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#0D0D0D',
    },

    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        alignItems: 'center',
        marginBottom: 25,
    },

    iconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#D90429',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 14,
        color: '#AAAAAA',
        textAlign: 'center',
    },

    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 8,
        marginTop: 5,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 14,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },

    input: {
        flex: 1,
        height: 52,
        marginLeft: 10,
        color: '#222222',
        fontSize: 15,
    },

    saveButton: {
        height: 55,
        backgroundColor: '#D90429',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },

    tipCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },

    tipContent: {
        flex: 1,
        marginLeft: 12,
    },

    tipTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    tipText: {
        color: '#AAAAAA',
        fontSize: 13,
        lineHeight: 19,
    },
});