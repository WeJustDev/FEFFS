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
    tint: '#d1d1d1',
    placeholderText: '#a1a1a1', // Couleur pour le texte du placeholder en mode clair
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
    button: '#d35446',
    texterror: '#ac0606',
    textsuccess: '#04b217'
  },
  dark: {
    text: '#ECEDEE',
    textsecondary: '#9BA1A6',
    background: '#151718',
    tint: '#252525',
    placeholderText: '#5a5a5a', // Couleur pour le texte du placeholder en mode sombre
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    
    // Couleurs spécifiques
    pageBg: '#0f0f10', // Noir très sombre
    cardBg: 'rgba(36, 36, 36, 0.6)', // Gardé identique pour un contraste cohérent
    cardDarkBg: '#171717', // Noir légèrement plus clair
    headerText: '#FFFFFF', // Blanc pour le texte en mode sombre
    dateTagBg: 'rgba(206, 90, 75, 0.2)', // Version semi-transparente
    dateTagText: '#ce5a4b', // Conservé
    button: '#d35446',
    texterror: '#ac0606',
    textsuccess: '#04b217'
  },
};