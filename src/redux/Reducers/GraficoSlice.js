import { createSlice } from '@reduxjs/toolkit';

const graficoSlice = createSlice({
  name: 'grafico',
  initialState: {
    series: [],
    options: {
      chart: {
        id: 'basic-pie',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: [],
          },
        },
      },
      labels: [], // Asegúrate de que labels esté definido en el estado inicial
    },
    tasksByStateData: {  // Define tasksByStateData en el estado inicial
      series: [],
      options: {},
    },
  },
  reducers: {
    updateGrafico: (state, action) => {
      state.series = action.payload.series;
      state.options = action.payload.options;
      state.labels = action.payload.labels; // Asegúrate de actualizar labels correctamente
      state.tasksByStateData = action.payload.tasksByStateData; // Actualiza tasksByStateData
    },
  },
});

export const { updateGrafico } = graficoSlice.actions;
export default graficoSlice.reducer;
