import React from "react";

import {useSafeAreaStyles} from "./ hooks";

import {View} from "react-native";

export const SafeAreaViewWrapper = ({children}: {children: React.ReactNode}) => {
  const safeAreaStyles = useSafeAreaStyles();

  return <View style={{flex: 1, ...safeAreaStyles}}>{children}</View>;
};
