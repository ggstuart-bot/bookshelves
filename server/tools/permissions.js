const isSelf = (user, targetUser) => user?.id === targetUser.id;
// Placeholder: this will need to change when users have admin rights
export const canViewUser = (user, targetUser) =>
    isSelf(user, targetUser) || Boolean(targetUser.isPublic);
export const canPublishProfile = (user, targetUser) => isSelf(user, targetUser);
const isOwner = (user, resource) => user?.id === resource.ownerId;
export const canUseShelf = (user, shelf) => isOwner(user, shelf);
export const canPublishShelf = (user, shelf) => isOwner(user, shelf) && Boolean(user.isPublic);
export const canViewShelf = (user, shelf) => isOwner(user, shelf) || Boolean(shelf.isPublic);
