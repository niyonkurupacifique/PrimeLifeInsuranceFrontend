/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  "./node_modules/flowbite/**/*.js", "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  darkMode:"class",
  theme: {
    extend: {
      screens: {
        'md-hp-elitebook': '1366px',
        // Add other breakpoints as needed
      },
      fontFamily:{
        myfontfamily:"Open Sans",
      },
    fontSize:{
      myfontsize:"20px",
      myfontsizeeee:"19px",
     tilemyfontsizeeee:"18px",
     xmyfontsize:"28px",
    },
    letterSpacing:{
      myletterspacing:'0'
    },
    fontWeight:{
      myfontweight:"200",
      myfontweightttt:"600",
      xmyfontweightttt:"700"
    },
    colors:{
      mycolor:'#0056b3',
      Smycolor:'#F9D308',
      darkModeColor:'#0F172A',
      dropdownTextColor:'#465E6D',
      xColor:'#159FDB',
      xxColor:'#F9D308',
      marqueColor:'#1D98CA',
      xxxxxColor:'#81C5E3',
      primeFirstColor:'#16A0DB',
      primeSecondColor:'#F9D308'
    }
    

    },
  },
  plugins: [],
}