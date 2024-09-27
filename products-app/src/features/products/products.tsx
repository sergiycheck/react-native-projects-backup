import React from "react";

import {AddProductAbsolute, StyledContainer, StyledProductItem, StyledText, imageStyles} from "../../styled-app";
import {Product, fetchProducts} from "../products-api";
import {ScreenNames} from "../screen-names";
import {blurhash, mergeTwoArraysOfObjectsById} from "../utils";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Image} from "expo-image";
import {FlatList, RefreshControl} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export function Products({navigation}: {navigation: any}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const {data, isLoading, isError} = useQuery({queryKey: ["products"], queryFn: fetchProducts});

  const dataLatest = React.useMemo(() => (data ? data?.sort((a, b) => b.id - a.id) : []), [data]);

  const queryClient = useQueryClient();

  const insets = useSafeAreaInsets();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);

      AsyncStorage.getItem("products", (err, result) => {
        if (err) return;
        const cachedProducts = result ? (JSON.parse(result) as Product[]) : [];
        queryClient.setQueryData<Product[]>(["products"], (oldProducts) => {
          const uniqueProducts = mergeTwoArraysOfObjectsById(oldProducts ?? [], cachedProducts);
          return uniqueProducts;
        });
      });
    }, 1000);
  }, []);

  return (
    <StyledContainer
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      {isLoading && <StyledText>Loading...</StyledText>}

      {isError && <StyledText>Error!</StyledText>}

      {dataLatest && (
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={dataLatest}
          renderItem={({item}) => <ProductItem product={item} />}
          keyExtractor={(item) => `${item.id}`}
        />
      )}

      <AddProductAbsolute onPress={() => navigation.navigate(ScreenNames.AddProduct)}>
        <Icon name="add-outline" size={30} color="#fff" />
      </AddProductAbsolute>
    </StyledContainer>
  );
}

const ProductItem = ({product}: {product: Product}) => {
  const navigation = useNavigation() as any;
  return (
    <StyledProductItem onPress={() => navigation.navigate(ScreenNames.ProductDetails, {itemId: product.id})}>
      <Image
        style={imageStyles.image}
        source={product.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      <StyledText>{product.title}</StyledText>
      <StyledText>{product.category}</StyledText>
      <StyledText>{product.price}</StyledText>
    </StyledProductItem>
  );
};
