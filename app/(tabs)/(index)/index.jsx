import { View } from 'react-native';
import HomePageHeader from '../../../components/HomePageHeader';
import HomePageToDoPrev from '../../../components/HomePageToDoPrev';

export default function HomeScreen() {

  return (
    <View style={{flex: 1, backgroundColor: "#f8d3d36f"}}>
      <HomePageHeader />
      <HomePageToDoPrev/>
    </View>
  );
}
