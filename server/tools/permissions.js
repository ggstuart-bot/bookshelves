const isOwner = (user, resource) => user?.id === resource.ownerId;
export const canUseShelf = (user, shelf) => isOwner(user, shelf);
// Placeholder: this will need to change when shelves can be public
export const canViewShelf = (user, shelf) => isOwner(user, shelf);
