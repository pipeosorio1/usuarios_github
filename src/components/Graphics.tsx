import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';

const Graphics = ({data}) => {
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const graphStyle={
    marginBottom: 50
  }

  return (
    <BarChart
      style={graphStyle}
      data={data}
      width={screenWidth}
      height={320}
      yAxisLabel=""
      yAxisSuffix=""
      chartConfig={chartConfig}
      verticalLabelRotation={30}
    />
  );
};

Graphics.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Graphics;