import React, { useEffect, useRef, useState } from 'react';

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

const filtros = [
    'Todos',
    'Pecho',
    'Espalda',
    'Piernas',
];

export default function RoutineListScreen() {

    const navigation = useNavigation<any>();

    const {
        routines,
        deleteRoutine,
        toggleFeatured,
    } = useRoutines();

    const [selectedFilter, setSelectedFilter] = useState('Todos');

    const pulse = useRef(
        new Animated.Value(1)
    ).current;

    useEffect(() => {

        Animated.loop(
            Animated.sequence([

                Animated.timing(pulse, {
                    toValue: 1.04,
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

    const filteredRoutines =
        selectedFilter === 'Todos'
            ? routines
            : routines.filter(
                routine =>
                    routine.muscleGroup === selectedFilter
            );

    return (
        <SafeAreaView style={styles.container}>

            {/* ENCABEZADO */}

            <View style={styles.header}>

                <View style={styles.headerContent}>

                    <View style={styles.brandRow}>

                        <View style={styles.brandIcon}>

                            <Ionicons
                                name="barbell"
                                size={21}
                                color="#FFFFFF"
                            />

                        </View>

                        <Text style={styles.brandText}>
                            GYMPRO
                        </Text>

                    </View>

                    <Text style={styles.title}>
                        Mis Rutinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Organiza tus entrenamientos y alcanza tus objetivos
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
                            size={29}
                            color="#FFFFFF"
                        />

                    </Pressable>

                </Animated.View>

            </View>

            {/* RESUMEN */}

            <View style={styles.summaryCard}>

                <View style={styles.summaryIcon}>

                    <Ionicons
                        name="fitness"
                        size={22}
                        color="#D90429"
                    />

                </View>

                <View style={styles.summaryInfo}>

                    <Text style={styles.summaryNumber}>
                        {filteredRoutines.length}
                    </Text>

                    <Text style={styles.summaryLabel}>
                        {filteredRoutines.length === 1
                            ? 'rutina disponible'
                            : 'rutinas disponibles'}
                    </Text>

                </View>

                <View style={styles.summaryLine} />

                <View style={styles.summaryInfo}>

                    <Text style={styles.summaryNumber}>
                        {routines.filter(
                            routine => routine.featured
                        ).length}
                    </Text>

                    <Text style={styles.summaryLabel}>
                        destacada
                    </Text>

                </View>

            </View>

            {/* FILTROS */}

            <View style={styles.filterSection}>

                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <View>

                        <Text style={styles.sectionTitle}>
                            Filtrar rutinas
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Selecciona un grupo muscular
                        </Text>

                    </View>

                </View>

                <View style={styles.filterContainer}>

                    {filtros.map((filter) => {

                        const isSelected =
                            selectedFilter === filter;

                        return (

                            <Pressable
                                key={filter}
                                style={[
                                    styles.filterButton,
                                    isSelected &&
                                    styles.filterButtonActive,
                                ]}
                                onPress={() =>
                                    setSelectedFilter(filter)
                                }
                            >

                                {isSelected && (

                                    <Ionicons
                                        name="checkmark-circle"
                                        size={15}
                                        color="#FFFFFF"
                                    />

                                )}

                                <Text
                                    style={[
                                        styles.filterText,
                                        isSelected &&
                                        styles.filterTextActive,
                                    ]}
                                >
                                    {filter}
                                </Text>

                            </Pressable>

                        );

                    })}

                </View>

            </View>

            {/* TÍTULO DE LISTA */}

            <View style={styles.listHeader}>

                <View>

                    <Text style={styles.listTitle}>
                        Mis entrenamientos
                    </Text>

                    <Text style={styles.listSubtitle}>
                        Tus rutinas guardadas
                    </Text>

                </View>

                <View style={styles.countBadge}>

                    <Text style={styles.countBadgeText}>
                        {filteredRoutines.length}
                    </Text>

                </View>

            </View>

            {/* LISTA */}

            <FlatList
                data={filteredRoutines}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}

                ListEmptyComponent={

                    <View style={styles.emptyContainer}>

                        <View style={styles.emptyIcon}>

                            <Ionicons
                                name="fitness-outline"
                                size={48}
                                color="#D90429"
                            />

                        </View>

                        <Text style={styles.emptyTitle}>
                            No hay rutinas
                        </Text>

                        <Text style={styles.emptyText}>
                            No existen rutinas para este grupo muscular.
                        </Text>

                        <Pressable
                            style={styles.emptyButton}
                            onPress={() =>
                                navigation.navigate('AddRoutine')
                            }
                        >

                            <Ionicons
                                name="add"
                                size={19}
                                color="#FFFFFF"
                            />

                            <Text style={styles.emptyButtonText}>
                                Crear rutina
                            </Text>

                        </Pressable>

                    </View>

                }

                renderItem={({ item }) => (

                    <View
                        style={[
                            styles.routineCard,
                            item.featured &&
                            styles.featuredCard,
                        ]}
                    >

                        {/* IMAGEN */}

                        <View style={styles.imageContainer}>

                            <Image
                                source={getImage(item.muscleGroup)}
                                style={styles.routineImage}
                            />

                            {item.featured && (

                                <View style={styles.featuredBadge}>

                                    <Ionicons
                                        name="star"
                                        size={12}
                                        color="#FFFFFF"
                                    />

                                    <Text style={styles.featuredBadgeText}>
                                        DESTACADA
                                    </Text>

                                </View>

                            )}

                        </View>

                        {/* INFORMACIÓN */}

                        <View style={styles.info}>

                            <Text
                                style={styles.routineTitle}
                                numberOfLines={2}
                            >
                                {item.name}
                            </Text>

                            <View style={styles.muscleContainer}>

                                <View style={styles.detailIconRed}>

                                    <Ionicons
                                        name="body-outline"
                                        size={13}
                                        color="#D90429"
                                    />

                                </View>

                                <Text style={styles.description}>
                                    {item.muscleGroup}
                                </Text>

                            </View>

                            <View style={styles.durationContainer}>

                                <View style={styles.detailIconGray}>

                                    <Ionicons
                                        name="time-outline"
                                        size={13}
                                        color="#777777"
                                    />

                                </View>

                                <Text style={styles.details}>
                                    {item.duration} min
                                </Text>

                            </View>

                        </View>

                        {/* ACCIONES */}

                        <View style={styles.actions}>

                            {/* DESTACAR */}

                            <Pressable
                                style={[
                                    styles.actionButton,
                                    item.featured
                                        ? styles.featuredAction
                                        : styles.starAction,
                                ]}
                                onPress={() =>
                                    toggleFeatured(item.id)
                                }
                            >

                                <Ionicons
                                    name={
                                        item.featured
                                            ? 'star'
                                            : 'star-outline'
                                    }
                                    size={19}
                                    color="#FFFFFF"
                                />

                            </Pressable>

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
                                    size={19}
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
                                    size={19}
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
                                    size={19}
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

    /* CONTENEDOR */

    container: {
        flex: 1,
        backgroundColor: '#070707',
    },

    /* ENCABEZADO */

    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerContent: {
        flex: 1,
        paddingRight: 15,
    },

    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    brandIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 9,
    },

    brandText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#D90429',
        letterSpacing: 2,
    },

    title: {
        fontSize: 29,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 0.2,
    },

    subtitle: {
        fontSize: 12,
        color: '#8E8E8E',
        marginTop: 4,
        lineHeight: 17,
    },

    /* BOTÓN AGREGAR */

    addButton: {
        width: 54,
        height: 54,
        borderRadius: 17,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 8,

        shadowColor: '#D90429',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.38,
        shadowRadius: 7,
    },

    /* RESUMEN */

    summaryCard: {
        marginHorizontal: 18,
        marginBottom: 18,
        backgroundColor: '#111111',
        borderRadius: 18,
        paddingVertical: 13,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#252525',
    },

    summaryIcon: {
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: '#26070D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 11,
    },

    summaryInfo: {
        flex: 1,
    },

    summaryNumber: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    summaryLabel: {
        fontSize: 11,
        color: '#858585',
        marginTop: 1,
    },

    summaryLine: {
        width: 1,
        height: 34,
        backgroundColor: '#303030',
        marginHorizontal: 13,
    },

    /* FILTROS */

    filterSection: {
        paddingHorizontal: 18,
        marginBottom: 17,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    redIndicator: {
        width: 5,
        height: 30,
        borderRadius: 3,
        backgroundColor: '#D90429',
        marginRight: 10,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    sectionSubtitle: {
        fontSize: 11,
        color: '#777777',
        marginTop: 2,
    },

    filterContainer: {
        flexDirection: 'row',
        gap: 7,
    },

    filterButton: {
        flex: 1,
        minHeight: 39,
        paddingHorizontal: 7,
        borderRadius: 12,
        backgroundColor: '#151515',
        borderWidth: 1,
        borderColor: '#2D2D2D',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },

    filterButtonActive: {
        backgroundColor: '#D90429',
        borderColor: '#D90429',
    },

    filterText: {
        color: '#9A9A9A',
        fontSize: 12,
        fontWeight: '800',
    },

    filterTextActive: {
        color: '#FFFFFF',
    },

    /* ENCABEZADO DE LISTA */

    listHeader: {
        marginHorizontal: 18,
        marginBottom: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    listTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    listSubtitle: {
        fontSize: 11,
        color: '#777777',
        marginTop: 2,
    },

    countBadge: {
        minWidth: 34,
        height: 30,
        paddingHorizontal: 9,
        borderRadius: 10,
        backgroundColor: '#26070D',
        borderWidth: 1,
        borderColor: '#4A0B17',
        justifyContent: 'center',
        alignItems: 'center',
    },

    countBadgeText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#D90429',
    },

    /* LISTA */

    listContent: {
        paddingHorizontal: 18,
        paddingBottom: 30,
    },

    /* TARJETA */

    routineCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 19,
        padding: 10,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: '#E6E6E6',

        elevation: 5,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },

    featuredCard: {
        borderWidth: 2,
        borderColor: '#D90429',
        backgroundColor: '#FFFDFD',
    },

    /* IMAGEN */

    imageContainer: {
        width: 84,
        height: 84,
        borderRadius: 15,
        overflow: 'hidden',
        position: 'relative',
        marginRight: 12,
    },

    routineImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    /* DESTACADA */

    featuredBadge: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
        height: 21,
        borderRadius: 7,
        backgroundColor: '#D90429',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    featuredBadgeText: {
        fontSize: 7,
        fontWeight: '900',
        color: '#FFFFFF',
        marginLeft: 3,
        letterSpacing: 0.3,
    },

    /* INFORMACIÓN */

    info: {
        flex: 1,
        paddingRight: 6,
    },

    routineTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#171717',
        lineHeight: 21,
    },

    muscleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
    },

    detailIconRed: {
        width: 22,
        height: 22,
        borderRadius: 7,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    description: {
        fontSize: 12,
        fontWeight: '800',
        color: '#D90429',
        marginLeft: 5,
    },

    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    detailIconGray: {
        width: 22,
        height: 22,
        borderRadius: 7,
        backgroundColor: '#F1F1F1',
        justifyContent: 'center',
        alignItems: 'center',
    },

    details: {
        fontSize: 11,
        color: '#666666',
        marginLeft: 5,
        fontWeight: '600',
    },

    /* ACCIONES */

    actions: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },

    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },

    starAction: {
        backgroundColor: '#6B5B00',
    },

    featuredAction: {
        backgroundColor: '#D90429',
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
        paddingTop: 75,
        paddingHorizontal: 30,
    },

    emptyIcon: {
        width: 86,
        height: 86,
        borderRadius: 25,
        backgroundColor: '#26070D',
        borderWidth: 1,
        borderColor: '#450B16',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFFFFF',
        marginTop: 17,
    },

    emptyText: {
        fontSize: 13,
        color: '#999999',
        marginTop: 7,
        textAlign: 'center',
        lineHeight: 20,
    },

    emptyButton: {
        marginTop: 18,
        paddingHorizontal: 18,
        height: 42,
        borderRadius: 12,
        backgroundColor: '#D90429',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },

    emptyButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '900',
    },

});