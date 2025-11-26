/**
 * Socket.io event handlers
 */

import type { Server, Socket } from 'socket.io';

/**
 * Setup Socket.io event handlers
 */
export function setupSocketHandlers(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.warn(`📡 Client connected: ${socket.id}`);

    // Join trip room
    socket.on('trip:join', (tripId: string) => {
      socket.join(`trip:${tripId}`);
      console.warn(`📡 Socket ${socket.id} joined trip:${tripId}`);
    });

    // Leave trip room
    socket.on('trip:leave', (tripId: string) => {
      socket.leave(`trip:${tripId}`);
      console.warn(`📡 Socket ${socket.id} left trip:${tripId}`);
    });

    // Handle location update
    socket.on('location:update', (data: {
      tripId: string;
      userId: string;
      latitude: number;
      longitude: number;
      timestamp: Date;
    }) => {
      // Broadcast to trip room
      io.to(`trip:${data.tripId}`).emit('location:updated', {
        userId: data.userId,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp,
      });
    });

    // Handle expense created
    socket.on('expense:created', (data: { tripId: string; expense: unknown }) => {
      socket.to(`trip:${data.tripId}`).emit('expense:new', data.expense);
    });

    // Handle expense updated
    socket.on('expense:updated', (data: { tripId: string; expense: unknown }) => {
      socket.to(`trip:${data.tripId}`).emit('expense:changed', data.expense);
    });

    // Handle expense deleted
    socket.on('expense:deleted', (data: { tripId: string; expenseId: string }) => {
      socket.to(`trip:${data.tripId}`).emit('expense:removed', { id: data.expenseId });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.warn(`📡 Client disconnected: ${socket.id}`);
    });
  });
}

export default setupSocketHandlers;
