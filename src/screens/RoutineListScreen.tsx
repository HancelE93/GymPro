import React, { useEffect, useRef } from 'react';

import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Pressable,
    Image,
    Animated,
    Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { useRoutines } from '../context/RoutineContext';

const imagenes = {
    Pecho: require('../assets/images/pecho.jpg'),
    Bíceps: require('../assets/images/biceps.jpg'),
    Tríceps: require('../assets/images/triceps.jpg'),
    Espalda: require('../assets/images/espalda.jpg'),
    Piernas: require('../assets/images/piernas.jpg'),
};

export default function RoutineListScreen() {

    const navigation = useNavigation<any>();

    const {
        routines,
        deleteRoutine,
    } = useRoutines();

    const pulse = useRef(
        new Animated.Value(1)
    ).current;

    useEffect(() => {

        Animated.loop(
            Animated.sequence([

                Animated.timing(pulse, {
                    toValue: 1.03,
                    duration: 1200,
                    useNativeDriver: true,
                }),

                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }),

            ])
        ).start();

    }, [pulse]);

    const getImage = (muscleGroup: string) => {

        return (
            imagenes[
                muscleGroup as keyof typeof imagenes
            ] || imagenes.Pecho
        );
    };

    const handleDelete = (
        id: string,
        name: string
    ) => {

        Alert.alert(
            'Eliminar rutina',
            `¿Seguro que quieres eliminar "${name}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => deleteRoutine(id),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* ENCABEZADO */}
            <View style={styles.header}>

                <View style={styles.headerLeft}>

                    <Text style={styles.title}>
                        Mis Rutinas
                    </Text>

                    <Text style={styles.subtitle}>
                        {routines.length} rutinas disponibles
                    </Text>

                </View>

                <Animated.View
                    style={{
                        transform: [{ scale: pulse }],
                    }}
                >
                    <Pressable
                        style={styles.addButton}
                        onPress={() =>
                            navigation.navigate('AddRoutine')
                        }
                    >
                        <Ionicons
                            name="add"
                            size={30}
                            color="#FFFFFF"
                        />
                    </Pressable>
                </Animated.View>

            </View>

            {/* INDICADOR */}
            <View style={styles.sectionHeader}>

                <View style={styles.redIndicator} />

                <Text style={styles.sectionText}>
                    Tus entrenamientos
                </Text>

            </View>

            {/* LISTA */}
            <FlatList
                data={routines}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}

                ListEmptyComponent={
                    <View style={styles.emptyContainer}>

                        <View style={styles.emptyIcon}>
                            <Ionicons
                                name="fitness-outline"
                                size={52}
                                color="#D90429"
                            />
                        </View>

                        <Text style={styles.emptyTitle}>
                            No hay rutinas
                        </Text>

                        <Text style={styles.emptyText}>
                            Pulsa el botón + para crear tu primera rutina.
                        </Text>

                    </View>
                }

                renderItem={({ item }) => (

                    <View style={styles.routineCard}>

                        {/* IMAGEN */}
                        <Image
                            source={getImage(item.muscleGroup)}
                            style={styles.routineImage}
                        />

                        {/* INFORMACIÓN */}
                        <View style={styles.info}>

                            <Text
                                style={styles.routineTitle}
                                numberOfLines={2}
                            >
                                {item.name}
                            </Text>

                            <View style={styles.muscleContainer}>

                                <Ionicons
                                    name="body-outline"
                                    size={14}
                                    color="#D90429"
                                />

                                <Text style={styles.description}>
                                    {item.muscleGroup}
                                </Text>

                            </View>

                            <View style={styles.durationContainer}>

                                <Ionicons
                                    name="time-outline"
                                    size={14}
                                    color="#777777"
                                />

                                <Text style={styles.details}>
                                    {item.duration} minutos
                                </Text>

                            </View>

                        </View>

                        {/* ACCIONES */}
                        <View style={styles.actions}>

                            {/* VER */}
                            <Pressable
                                style={[
                                    styles.actionButton,
                                    styles.viewAction,
                                ]}
                                onPress={() =>
                                    navigation.navigate(
                                        'Detail',
                                        {
                                            id: item.id,
                                        }
                                    )
                                }
                            >
                                <Ionicons
                                    name="eye-outline"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </Pressable>

                            {/* EDITAR */}
                            <Pressable
                                style={[
                                    styles.actionButton,
                                    styles.editAction,
                                ]}
                                onPress={() =>
                                    navigation.navigate(
                                        'AddRoutine',
                                        {
                                            id: item.id,
                                        }
                                    )
                                }
                            >
                                <Ionicons
                                    name="pencil-outline"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </Pressable>

                            {/* ELIMINAR */}
                            <Pressable
                                style={[
                                    styles.actionButton,
                                    styles.deleteAction,
                                ]}
                                onPress={() =>
                                    handleDelete(
                                        item.id,
                                        item.name
                                    )
                                }
                            >
                                <Ionicons
                                    name="trash-outline"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </Pressable>

                        </View>

                    </View>

                )}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    /* CONTENEDOR GENERAL */
    container: {
        flex: 1,
        backgroundColor: '#050505',
    },

    /* ENCABEZADO */
    header: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerLeft: {
        flex: 1,
        paddingRight: 15,
    },

    title: {
        fontSize: 30,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },

    subtitle: {
        fontSize: 14,
        color: '#AAAAAA',
        marginTop: 5,
    },

    /* BOTÓN AGREGAR */
    addButton: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 7,

        shadowColor: '#D90429',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6,
    },

    /* ENCABEZADO DE SECCIÓN */
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },

    redIndicator: {
        width: 5,
        height: 22,
        borderRadius: 3,
        backgroundColor: '#D90429',
        marginRight: 9,
    },

    sectionText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    /* LISTA */
    listContent: {
        paddingHorizontal: 18,
        paddingBottom: 30,
    },

    /* CARD BLANCA */
    routineCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 19,
        padding: 12,
        marginBottom: 13,
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: '#E7E7E7',

        elevation: 6,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6,
    },

    /* IMAGEN */
    routineImage: {
        width: 82,
        height: 82,
        borderRadius: 15,
        marginRight: 13,
        resizeMode: 'cover',
    },

    /* INFORMACIÓN */
    info: {
        flex: 1,
        paddingRight: 7,
    },

    routineTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#171717',
        lineHeight: 22,
    },

    muscleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
    },

    description: {
        fontSize: 13,
        fontWeight: '700',
        color: '#D90429',
        marginLeft: 5,
    },

    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },

    details: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 5,
    },

    /* BOTONES DE ACCIÓN */
    actions: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
    },

    actionButton: {
        width: 38,
        height: 38,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewAction: {
        backgroundColor: '#1B4F72',
    },

    editAction: {
        backgroundColor: '#8A4B08',
    },

    deleteAction: {
        backgroundColor: '#D90429',
    },

    /* ESTADO VACÍO */
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        paddingHorizontal: 30,
    },

    emptyIcon: {
        width: 85,
        height: 85,
        borderRadius: 25,
        backgroundColor: '#26070D',
        borderWidth: 1,
        borderColor: '#450B16',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFFFFF',
        marginTop: 18,
    },

    emptyText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 7,
        textAlign: 'center',
        lineHeight: 21,
    },

});