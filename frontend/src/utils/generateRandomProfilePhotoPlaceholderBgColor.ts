export const generateRandomProfilePhotoPlaceholderBgColor = (
  contactName : string
): string => {
  const noProfilePhotoBgColorsPalette = ['#FFC0CB', '#87CEEB', '#FFD700', '#FFA500', '#90EE90', '#D3D3D3', '#ffb3b3'];

  const getColorIndex = () => {
    if (!contactName) return 0;
    const charSum = contactName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return charSum % noProfilePhotoBgColorsPalette.length;
  };

  const backgroundColorPlaceholder = noProfilePhotoBgColorsPalette[getColorIndex()];

  return backgroundColorPlaceholder;
}