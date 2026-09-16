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
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useRoutines } from '../context/RoutineContext';

export default function AddRoutineScreen({ navigation, route }: any) {

    const {
        routines,
        addRoutine,
        updateRoutine,
    } = useRoutines();

    const idToEdit = route.params?.id;

    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [durationString, setDurationString] = useState('');

    useEffect(() => {

        if (idToEdit) {

            const routineFound = routines.find(
                routine => routine.id === idToEdit
            );

            if (routineFound) {
                setName(routineFound.name);
                setMuscleGroup(routineFound.muscleGroup);
                setDurationString(
                    routineFound.duration.toString()
                );
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
                'Completa todos los campos.'
            );
            return;
        }

        const durationNumber = parseFloat(durationString);

        if (isNaN(durationNumber)) {
            Alert.alert(
                'Duración inválida',
                'La duración debe ser un número válido.'
            );
            return;
        }

        if (durationNumber <= 0) {
            Alert.alert(
                'Duración inválida',
                'La duración debe ser mayor que 0.'
            );
            return;
        }

        if (idToEdit) {

            updateRoutine(idToEdit, {
                name: name.trim(),
                muscleGroup: muscleGroup.trim(),
                duration: durationNumber,
            });

        } else {

            addRoutine({
                name: name.trim(),
                muscleGroup: muscleGroup.trim(),
                duration: durationNumber,
            });

        }

        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={
                    Platform.OS === 'ios'
                        ? 'padding'
                        : undefined
                }
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >

                    {/* ENCABEZADO */}
                    <View style={styles.header}>

                        <View style={styles.headerIcon}>
                            <Ionicons
                                name={
                                    idToEdit
                                        ? 'create-outline'
                                        : 'add-circle-outline'
                                }
                                size={34}
                                color="#D90429"
                            />
                        </View>

                        <Text style={styles.title}>
                            {idToEdit
                                ? 'Editar rutina'
                                : 'Nueva rutina'}
                        </Text>

                        <Text style={styles.subtitle}>
                            {idToEdit
                                ? 'Actualiza la información de tu entrenamiento'
                                : 'Crea una nueva rutina para tu entrenamiento'}
                        </Text>

                    </View>

                    {/* FORMULARIO */}
                    <View style={styles.formCard}>

                        {/* NOMBRE */}
                        <Text style={styles.label}>
                            Nombre de la rutina
                        </Text>

                        <View style={styles.inputContainer}>

                            <Ionicons
                                name="create-outline"
                                size={21}
                                color="#D90429"
                            />

                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Ej. Pecho y Tríceps"
                                placeholderTextColor="#999999"
                            />

                        </View>

                        {/* GRUPO MUSCULAR */}
                        <Text style={styles.label}>
                            Grupo muscular
                        </Text>

                        <View style={styles.inputContainer}>

                            <Ionicons
                                name="fitness-outline"
                                size={21}
                                color="#D90429"
                            />

                            <TextInput
                                style={styles.input}
                                value={muscleGroup}
                                onChangeText={setMuscleGroup}
                                placeholder="Ej. Pecho"
                                placeholderTextColor="#999999"
                            />

                        </View>

                        {/* DURACIÓN */}
                        <Text style={styles.label}>
                            Duración en minutos
                        </Text>

                        <View style={styles.inputContainer}>

                            <Ionicons
                                name="time-outline"
                                size={21}
                                color="#D90429"
                            />

                            <TextInput
                                style={styles.input}
                                value={durationString}
                                onChangeText={setDurationString}
                                keyboardType="numeric"
                                placeholder="Ej. 45"
                                placeholderTextColor="#999999"
                            />

                        </View>

                        {/* BOTÓN */}
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                            activeOpacity={0.8}
                        >

                            <Ionicons
                                name={
                                    idToEdit
                                        ? 'checkmark-circle-outline'
                                        : 'save-outline'
                                }
                                size={22}
                                color="#FFFFFF"
                            />

                            <Text style={styles.saveButtonText}>
                                {idToEdit
                                    ? 'Actualizar rutina'
                                    : 'Guardar rutina'}
                            </Text>

                        </TouchableOpacity>

                    </View>

                    {/* CONSEJO */}
                    <View style={styles.tipCard}>

                        <View style={styles.tipIcon}>
                            <Ionicons
                                name="bulb-outline"
                                size={22}
                                color="#D90429"
                            />
                        </View>

                        <View style={styles.tipContent}>

                            <Text style={styles.tipTitle}>
                                Consejo GymPro
                            </Text>

                            <Text style={styles.tipText}>
                                Usa un nombre claro y una duración
                                aproximada para organizar mejor
                                tus entrenamientos.
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
        backgroundColor: '#050505',
    },

    flex: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 40,
    },

    /* ENCABEZADO */
    header: {
        alignItems: 'center',
        marginBottom: 22,
    },

    headerIcon: {
        width: 76,
        height: 76,
        borderRadius: 23,
        backgroundColor: '#FDECEF',
        borderWidth: 1,
        borderColor: '#450B16',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },

    title: {
        fontSize: 29,
        fontWeight: '900',
        color: '#FFFFFF',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 14,
        color: '#A7A7A7',
        marginTop: 7,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 12,
    },

    /* FORMULARIO */
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 21,
        padding: 20,

        borderWidth: 1,
        borderColor: '#E7E7E7',

        elevation: 6,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.28,
        shadowRadius: 6,
    },

    label: {
        fontSize: 14,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 8,
        marginTop: 8,
    },

    inputContainer: {
        minHeight: 55,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 14,
        backgroundColor: '#FAFAFA',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        marginBottom: 11,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: '#222222',
        marginLeft: 10,
    },

    /* BOTÓN */
    saveButton: {
        marginTop: 18,
        height: 55,
        borderRadius: 15,
        backgroundColor: '#D90429',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 5,

        shadowColor: '#D90429',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        marginLeft: 8,
    },

    /* CONSEJO */
    tipCard: {
        marginTop: 16,
        backgroundColor: '#121212',
        borderRadius: 18,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: '#292929',
    },

    tipIcon: {
        width: 44,
        height: 44,
        borderRadius: 13,
        backgroundColor: '#26070D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    tipContent: {
        flex: 1,
    },

    tipTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 3,
    },

    tipText: {
        fontSize: 12,
        color: '#999999',
        lineHeight: 17,
    },

});