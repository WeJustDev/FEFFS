import React, { useState } from 'react';
import { View, Vibration, TouchableOpacity } from 'react-native';
import { Home, Calendar, Tickets, SquareUser, ScanQRcode } from './svg';

const links = [
  { name: 'Accueil', icon: Home },
  { name: 'Programmation', icon: Calendar },
  { name: 'Billets', icon: Tickets },
];

const secondaryLinks = [
  { name: 'Mes billets', icon: SquareUser },
  { name: 'QR Code', icon: ScanQRcode },
];

export default function Nav() {
  const [selectedLink, setSelectedLink] = useState("Accueil");
  const [visibleTooltip, setVisibleTooltip] = useState(null);

  const handlePress = (name) => {
    Vibration.vibrate(50); 
    setSelectedLink(name);
  };

  return (
    <View className="absolute bottom-5 flex-1 flex-row gap-5">
      <View className="rounded-3xl flex-row justify-center items-center gap-5 bg-white text-white">
        {links.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(link.name)}
            onPressIn={() => setVisibleTooltip(link.name)}
            onPressOut={() => setVisibleTooltip(null)}
            className={`rounded-2xl p-2.5 px-2.5 m-2 ${
              selectedLink === link.name ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            accessibilityLabel={link.name}
          >
            <link.icon
                width={30}
                height={30}
                fill={selectedLink === link.name ? '#fff' : '#000'}
              />
          </TouchableOpacity>
        ))}
      </View>
      <View className="rounded-3xl flex-row justify-center items-center bg-gray-100 text-white">
        {secondaryLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(link.name)}
            onPressIn={() => setVisibleTooltip(link.name)}
            onPressOut={() => setVisibleTooltip(null)}
            className={`rounded-2xl p-2.5 px-2.5 m-2 ${
              selectedLink === link.name ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            accessibilityLabel={link.name}
          >
            <link.icon
                width={30}
                height={30}
                fill={selectedLink === link.name ? '#fff' : '#000'}
              />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}