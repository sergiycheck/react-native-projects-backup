import React from "react";

import {useSafeAreaStyles} from "../ hooks";
import {StyledButton, StyledButtonText, StyledContainer, StyledText, imageStyles} from "../../styled-app";
import {Product, fetchSingleProduct} from "../products-api";
import {blurhash} from "../utils";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {useQuery} from "@tanstack/react-query";
import {Image} from "expo-image";
import {ScrollView, View} from "react-native";

export const ProductDetails = ({route, navigation}: {route: any; navigation: any}) => {
  const {itemId} = route.params;

  const [product, setProduct] = React.useState<Product | null>(null);

  const {data, isLoading, isError} = useQuery({
    queryKey: ["products", itemId],
    queryFn: () => {
      return fetchSingleProduct(itemId);
    },
  });

  React.useEffect(() => {
    if (data) {
      setProduct(data);
    } else {
      AsyncStorage.getItem("products", (err, result) => {
        if (err) return;
        const cachedProducts = result ? (JSON.parse(result) as Product[]) : [];
        const product = cachedProducts.find((p) => p.id === itemId);
        if (product) {
          setProduct(product);
        }
      });
    }
  }, [data]);

  const safeAreInsets = useSafeAreaStyles();

  return (
    <StyledContainer
      style={{
        ...safeAreInsets,
      }}>
      {isLoading && <StyledText>Loading...</StyledText>}
      {isError && <StyledText>Error!</StyledText>}
      {product && (
        <ScrollView style={{flex: 1, display: "flex", flexDirection: "column", padding: 20, width: "100%"}}>
          <Image
            style={imageStyles.image}
            source={product.image}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />
          <StyledText style={{marginTop: 20}}>{product.title}</StyledText>
          <StyledText style={{marginTop: 20}}>{product.price}</StyledText>
          <StyledText style={{marginTop: 20}}>{product.category}</StyledText>
          <StyledText style={{marginTop: 20}}>{product.description}</StyledText>
        </ScrollView>
      )}

      <View style={{padding: 20}}>
        <StyledButton onPress={() => navigation.goBack()}>
          <StyledButtonText>Go back</StyledButtonText>
        </StyledButton>
      </View>
    </StyledContainer>
  );
};
