import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipe, index, onRecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipe ? recipe.title : "");
  const [image, setImage] = useState(recipe ? recipe.image : "");
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients : "");
  const [description, setDescription] = useState(recipe ? recipe.description : "");

  const saveRecipe = async () => {
    try {
      const newRecipe = { title, image, ingredients, description };
      const existingRecipes = await AsyncStorage.getItem("customRecipes");
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

      // update recipe
      if (recipe) {
        recipes[index] = newRecipe;
      }
      // add a new recipe
      else {
        recipes.push(newRecipe);
      }
      await AsyncStorage.setItem("customRecipes", JSON.stringify(recipes));
      if (onRecipeEdited)
        onRecipeEdited();  // notify the edit
      navigation.goBack();
    } catch (error) {
      console.error("Error saving the recipe: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { textAlignVertical: "top" }]}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saveRecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height: 200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
