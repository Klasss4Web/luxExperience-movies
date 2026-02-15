export const shareLink = (url: string): void => {
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this new movie i just added",
        text: "Hi Jane Doe just added some latest designs to her store collections, use this link to view them",
        url,
      })
      .then(() => alert("Sharing..."))
      .catch(() => alert("Error sharing"));
  } else {
    alert("Your system doesn't support sharing");
  }
};
