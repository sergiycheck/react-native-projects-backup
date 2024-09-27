import {AddProduct} from "./src/features/add-product/add-product";
import {ProductDetails} from "./src/features/product-details/product-details";
import {Products} from "./src/features/products/products";
import {ScreenNames} from "./src/features/screen-names";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister";
import {QueryClient} from "@tanstack/react-query";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {SafeAreaProvider} from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.Products} screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name={ScreenNames.Products} component={Products} />
        <Stack.Screen name={ScreenNames.ProductDetails} component={ProductDetails} />
      </Stack.Group>

      <Stack.Group screenOptions={{presentation: "modal"}}>
        <Stack.Screen name={ScreenNames.AddProduct} component={AddProduct} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PersistQueryClientProvider client={queryClient} persistOptions={{persister: asyncStoragePersister}}>
          <MyTabs />
        </PersistQueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
