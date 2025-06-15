/**
 * QueueEntry type – represents a user's position in a queue for a specific project.
 * Useful for managing turn-based access, review order, or assignment prioritization.
 * 
 * @type
 * 
 * @property userId Numeric identifier representing the user in the queue.
 * @property projectId Numeric identifier of the associated project.
 * @property position The user's position in the queue, where lower numbers represent higher priority.
 */
export type QueueEntry = {
    userId: number,
    projectId: number,
    position: number
}