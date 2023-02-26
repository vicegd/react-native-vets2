import { useContext, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { VetsContext } from "../services/vets.context";
import { FavouritesContext } from "../data/favourites.context";
import { VetInfoCardComponent } from "../components/vet-info-card.component";
import { SearchComponent } from "../components/search.component";
import { FavouritesBarComponent } from "../components/favourites-bar.component";
import { FadeInAnimation } from "../animations/fade-in.animation";
import { LoadingContainer, Loading } from "../theme/styles";

export const VetsScreen = ({ navigation }) => {
  const vetsContext = useContext(VetsContext);
  const favouritesContext = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  return (
    <>
      {vetsContext.isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}

      <SearchComponent
        from="vets"
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBarComponent
          favourites={favouritesContext.favourites}
          onNavigate={navigation.navigate}
        />
      )}

      <FlatList
        data={vetsContext.vets}
        renderItem={({ item }) => {
          //console.log(JSON.stringify(item, null, "\t")); return{" "}
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VetDetailScreen", {
                  vet: item,
                })
              }
            >
              <FadeInAnimation>
                <VetInfoCardComponent vet={item} />
              </FadeInAnimation>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </>
  );
};
