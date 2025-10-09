import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCart = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        {/* <View className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 rounded-b-2xl">
          <Text className="text-white text-sm font-semibold" numberOfLines={1}>
            {title}
          </Text>
        </View> */}

        <View className="absolute bottom-9 -left-3.5 px-2 py-2 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={1}
        >
          {title}
        </Text> 
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCart;
