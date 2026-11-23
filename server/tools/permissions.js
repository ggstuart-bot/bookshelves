export const isSelf = (user, targetUser) => user?.id === targetUser.id;
export const canViewUser = (user, targetUser) =>
    isSelf(user, targetUser) || Boolean(targetUser.isPublic);
export const canChangeAvatar = (user, targetUser) => isSelf(user, targetUser);
export const canPublishProfile = (user, targetUser) => isSelf(user, targetUser);
const isOwner = (user, resource) => user?.id === resource.ownerId;
export const canUseShelf = (user, shelf) => isOwner(user, shelf);
export const canViewShelf = (user, shelf) => isOwner(user, shelf) || Boolean(shelf.isPublic);
