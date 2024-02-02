import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const boardsPath = path.resolve('models', 'boards.json');

const updateBoards = boards =>
  fs.writeFile(boardsPath, JSON.stringify(boards, null, 2));

export const getAllBoards = async () => {
  const data = await fs.readFile(boardsPath);
  return JSON.parse(data);
};

export const getBoardById = async boardId => {
  const boards = await getAllBoards();
  const result = boards.find(board => board.id === boardId);
  return result || null;
};

export const addBoard = async data => {
  const boards = await getAllBoards();
  const newBoard = {
    id: nanoid(),
    ...data,
  };
  boards.push(newBoard);
  await updateBoards(boards);
  return newBoard;
};

export const updateBoard = async (boardId, data) => {
  const boards = await getAllBoards();
  const index = boards.findIndex(board => board.id === boardId);
  if (index === -1) {
    return null;
  }
  boards[index] = { ...boards[index], ...data };
  await updateBoards(boards);
  return boards[index];
};

export const deleteBoard = async boardId => {
  const boards = await getAllBoards();
  const index = boards.findIndex(board => board.id === boardId);
  if (index === -1) {
    return null;
  }
  const [deletedBoard] = boards.splice(index, 1);
  await updateBoards(boards);
  return deletedBoard;
};
