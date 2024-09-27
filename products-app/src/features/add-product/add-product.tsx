import React from "react";

import {SErrorText, StyledButton, StyledButtonText, StyledText, imageStyles} from "../../styled-app";
import {Product, productSchema} from "../products-api";
import {ScreenNames} from "../screen-names";
import {blurhash} from "../utils";
import {
  AddImageTouchableOpacity,
  AddProductContainer,
  EditImageTouchableOpacity,
  SImageWrapper,
  STextInput,
  TextInputMaskStyles,
} from "./styled";

import {zodResolver} from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useQueryClient} from "@tanstack/react-query";
import {Image} from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {Controller, useForm} from "react-hook-form";
import {View} from "react-native";
import {TextInputMask} from "react-native-masked-text";
import IconFeather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import * as z from "zod";

const productToAddSchema = productSchema.omit({id: true, image: true});
type ProductToAdd = z.infer<typeof productToAddSchema>;

export function AddProduct({navigation}: {navigation: any}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ProductToAdd>({
    resolver: zodResolver(productToAddSchema),
    defaultValues: {
      title: "",
      price: "",
      category: "",
      description: "",
    },
  });

  const [image, setImage] = React.useState<string | null>(null);
  const queryClient = useQueryClient();

  const onSubmit = (data: ProductToAdd) => {
    if (!image) return;

    const oldProducts = queryClient.getQueryData<Product[]>(["products"]) ?? [];

    const newProduct: Product = {
      ...data,
      image,
      id: oldProducts.length + 1,
    };

    AsyncStorage.getItem("products", (err, result) => {
      if (err) return;

      const prevProducts = result ? (JSON.parse(result) as Product[]) : [];

      const newProducts = [...prevProducts, newProduct];

      AsyncStorage.setItem("products", JSON.stringify(newProducts), () => {
        navigation.navigate(ScreenNames.Products);
      });
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <AddProductContainer>
      <StyledText>Add product!</StyledText>

      <SImageWrapper>
        {!image ? (
          <AddImageTouchableOpacity onPress={pickImage}>
            <Icon name="add-outline" size={30} color="#fff" />
          </AddImageTouchableOpacity>
        ) : (
          <>
            <Image
              style={{
                height: 200,
                width: 200,
                backgroundColor: "#0553",
              }}
              source={{uri: image}}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
            <EditImageTouchableOpacity onPress={pickImage}>
              <IconFeather name="edit-2" size={20} color="gray" />
            </EditImageTouchableOpacity>
          </>
        )}
      </SImageWrapper>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 10,
        }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <STextInput placeholder="Title" onBlur={onBlur} onChangeText={onChange} value={value} />
          )}
          name="title"
        />
        {errors.title && <SErrorText>This is required.</SErrorText>}

        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <STextInput placeholder="Category" onBlur={onBlur} onChangeText={onChange} value={value} />
          )}
          name="category"
        />

        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputMask
              style={TextInputMaskStyles.STextInput}
              type="money"
              placeholder="Price"
              options={{
                unit: "UAH ",
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="price"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <STextInput placeholder="Description" onBlur={onBlur} onChangeText={onChange} value={value} />
          )}
          name="description"
        />

        <StyledButton onPress={handleSubmit(onSubmit)}>
          <StyledButtonText>Submit</StyledButtonText>
        </StyledButton>
      </View>
    </AddProductContainer>
  );
}
