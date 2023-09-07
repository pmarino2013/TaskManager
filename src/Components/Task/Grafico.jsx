import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGrafico } from '../../redux/Reducers/GraficoSlice';
import ReactApexChart from 'react-apexcharts';
import '../Task/css/Grafico.css';

const Grafico = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const searchTerm = useSelector((state) => state.tasks.searchTerm);
  const filterByDone = useSelector((state) => state.tasks.filterByDone);
  const filterByPending = useSelector((state) => state.tasks.filterByPending);

  const calculateChartData = (searchTerm, filterByDone, filterByPending) => {
    const filteredTasks = tasks.filter((task) => {
      if (!task.Titulo) {
        return false;
      }

      const lowerSearchTerm = searchTerm.toLowerCase();
      const lowerTitle = task.Titulo.toLowerCase();
      const lowerDate = task.Fecha.toLowerCase();
      const lowerPriority = task.Prioridad.toLowerCase();

      if (
        (filterByDone && !task.done) ||
        (filterByPending && !task.pending)
      ) {
        return false;
      }

      return (
        lowerTitle.includes(lowerSearchTerm) ||
        lowerDate.includes(lowerSearchTerm) ||
        lowerPriority.includes(lowerSearchTerm)
      );
    });

    const tasksByPriority = filteredTasks.reduce((accumulator, task) => {
      const priority = task.Prioridad || 'Sin Prioridad';
      accumulator[priority] = (accumulator[priority] || 0) + 1;
      return accumulator;
    }, {});

    const chartData = {
      series: Object.values(tasksByPriority),
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
        labels: Object.keys(tasksByPriority),
      },
    };

    return chartData;
  };

  useEffect(() => {
    // Calcula los datos del gráfico cuando cambie searchTerm, filterByDone o filterByPending
    const chartData = calculateChartData(searchTerm, filterByDone, filterByPending);
    // Actualiza el gráfico con los nuevos datos
    dispatch(updateGrafico(chartData));
  }, [searchTerm, filterByDone, filterByPending, dispatch, tasks]);

  const pieData = useSelector((state) => state.grafico);

  return (
    <div className="grafico" data-aos="zoom-in-left">
      <div className="">
        <ReactApexChart
          options={pieData.options}
          series={pieData.series}
          type="pie"
          width="100%"
          height="350px"
        />
      </div>
    </div>
  );
};

export default Grafico;
