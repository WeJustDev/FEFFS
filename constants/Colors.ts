/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    textsecondary: '#687076',
    background: '#f4f4f4', // Légèrement modifié pour le thème clair
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    
    // Couleurs spécifiques
    pageBg: '#ffffff', // Blanc pour le fond de page en mode clair
    cardBg: '#e4e2d4', // Couleur beige clair pour les cartes
    cardDarkBg: '#f0f0f0', // Gris très clair pour les sections sombres
    headerText: '#000000', // Noir pour le texte en mode clair
    dateTagBg: 'rgba(206, 90, 75, 0.1)', // Version plus claire du tag de date
    dateTagText: '#ce5a4b', // Conservé du thème sombre
  },
  dark: {
    text: '#ECEDEE',
    textsecondary: '#9BA1A6',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    
    // Couleurs spécifiques
    pageBg: '#0f0f10', // Noir très sombre
    cardBg: '#e4e2d4', // Gardé identique pour un contraste cohérent
    cardDarkBg: '#171717', // Noir légèrement plus clair
    headerText: '#FFFFFF', // Blanc pour le texte en mode sombre
    dateTagBg: 'rgba(206, 90, 75, 0.2)', // Version semi-transparente
    dateTagText: '#ce5a4b', // Conservé
  },
};