// Describing the shape of the tree's slice of state
export interface Media {
  blobURL: string;
  extension: string;
  hasAnnotation: boolean;
  isAnnotation: boolean;
  isMerged: boolean;
  inMilestones: boolean;
  mimeType: string;
  name: string;
  path: string;
  wsAllowed: boolean;
  waveform: string;
}

export interface TreeState {
  env: string;
  path: string;
  folderName: string;
  loaded: boolean;
  availableFiles: any[];
  sourceMedia: Media[];
  annotMedia: Media[];
  prevPath: string;
}
export interface ActiveFolderState {
  env: string;
  path: string;
  loaded: boolean;
  availableFiles?: [Blob];
  availableMedia?: [Blob];
}

// Describing the different ACTION NAMES available
export const UPDATE_TREE = "UPDATE_TREE";

interface UpdateActiveFolder {
  type: typeof UPDATE_TREE;
  payload: ActiveFolderState;
}

export type TreeActionTypes = UpdateActiveFolder;
