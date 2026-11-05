const isOwner = (user, resource) => user?.id === resource.ownerId;
export const canUseShelf = (user, shelf) => isOwner(user, shelf);
