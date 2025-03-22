declare module 'react-beautiful-dnd' {
  import * as React from 'react';

  // DragDropContext
  export interface DragDropContextProps {
    onDragEnd: (result: DropResult) => void;
    onDragStart?: (initial: DragStart) => void;
    onDragUpdate?: (update: DragUpdate) => void;
    children?: React.ReactNode;
  }

  export class DragDropContext extends React.Component<DragDropContextProps> {}

  // Droppable
  export interface DroppableProps {
    droppableId: string;
    type?: string;
    direction?: 'horizontal' | 'vertical';
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    ignoreContainerClipping?: boolean;
    renderClone?: any;
    getContainerForClone?: any;
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement;
  }

  export class Droppable extends React.Component<DroppableProps> {}

  export interface DroppableProvided {
    innerRef: React.Ref<any>;
    droppableProps: {
      [key: string]: any;
    };
    placeholder?: React.ReactElement | null;
  }

  export interface DroppableStateSnapshot {
    isDraggingOver: boolean;
    draggingOverWith?: string;
    draggingFromThisWith?: string;
    isUsingPlaceholder: boolean;
  }

  // Draggable
  export interface DraggableProps {
    draggableId: string;
    index: number;
    isDragDisabled?: boolean;
    disableInteractiveElementBlocking?: boolean;
    shouldRespectForcePress?: boolean;
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactElement;
  }

  export class Draggable extends React.Component<DraggableProps> {}

  export interface DraggableProvided {
    innerRef: React.Ref<any>;
    draggableProps: {
      [key: string]: any;
      style?: React.CSSProperties;
    };
    dragHandleProps?: {
      [key: string]: any;
    };
  }

  export interface DraggableStateSnapshot {
    isDragging: boolean;
    isDropAnimating: boolean;
    isClone?: boolean;
    dropAnimation?: {
      duration: number;
      curve: string;
      moveTo: {
        x: number;
        y: number;
      };
    };
    draggingOver?: string;
    combineWith?: string;
    combineTargetFor?: string;
    mode?: string;
  }

  // DropResult
  export interface DropResult {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    destination?: {
      droppableId: string;
      index: number;
    } | null;
    reason?: 'DROP' | 'CANCEL';
    combine?: {
      draggableId: string;
      droppableId: string;
    } | null;
    mode?: 'FLUID' | 'SNAP';
  }

  // DragStart
  export interface DragStart {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    mode?: 'FLUID' | 'SNAP';
  }

  // DragUpdate
  export interface DragUpdate extends DragStart {
    destination?: {
      droppableId: string;
      index: number;
    } | null;
    combine?: {
      draggableId: string;
      droppableId: string;
    } | null;
  }
}
