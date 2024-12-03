import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export const Home = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <Path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Svg>
);

export const Calendar = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M8 2v4" />
    <Path d="M16 2v4" />
    <Rect width="18" height="18" x="3" y="4" rx="2" />
    <Path d="M3 10h18" />
    <Path d="M8 14h.01" />
    <Path d="M12 14h.01" />
    <Path d="M16 14h.01" />
    <Path d="M8 18h.01" />
    <Path d="M12 18h.01" />
    <Path d="M16 18h.01" />
  </Svg>
);

export const Tickets = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M4.5 8L15.08 2.94a1 1 0 0 1 1.342.488L18.5 8" />
    <Path d="M6 10V8" />
    <Path d="M6 14v1" />
    <Path d="M6 19v2" />
    <Rect x="2" y="8" width="20" height="13" rx="2" />
  </Svg>
);

export const SquareUser = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Rect width="18" height="18" x="3" y="3" rx="2" />
    <Circle cx="12" cy="10" r="3" />
    <Path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
  </Svg>
);

export const ScanQRcode = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M17 12v4a1 1 0 0 1-1 1h-4" />
    <Path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <Path d="M17 8V7" />
    <Path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <Path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <Path d="M7 17h.01" />
    <Path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <Rect x="7" y="7" width="5" height="5" rx="1" />
  </Svg>
);