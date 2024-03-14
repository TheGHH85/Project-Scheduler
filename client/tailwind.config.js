/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
           // Main dark blue background
           darkblue: '#0D3B66',

           // Header and Footer colors
           lightgrey: '#F0F4F8',
           softblue: '#75A1DE',
   
           // Accent colors for Link and Class boxes
           accent1: '#F4D35E', // Vibrant yellow/gold
           accent2: '#2EC4B6', // Bright teal
           accent3: '#3d6284',
   
           // Text and icons
           primarytext: '#FFFFFF', // White for primary text
           secondarytext: '#CAD2C5', // Light gray-green for secondary text
   
           // Additional UI elements
           neutraldark: '#1B2D45', // Dark for borders or shadows
           neutrallight: '#627D98', // Light for disabled elements or lower priority actions
         },
       },
     },
     variants: {},
  plugins: [],
}

