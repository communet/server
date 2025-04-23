export function validateAvatarFileExtension(fileName: string): boolean {
  const allowedExtensions = ['jpg', 'jpeg', 'png'];
  const lastDotIndex = fileName.lastIndexOf('.');
  const fileExtension =
    lastDotIndex !== -1 ? fileName.slice(lastDotIndex + 1) : '';
  return Boolean(fileExtension && allowedExtensions.includes(fileExtension));
}
