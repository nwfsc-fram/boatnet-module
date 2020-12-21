/*
Base Operation Class, intended to be subclassed

Hauls, Sets, etc., store common attributes between
different types of operations here (currently none to store)
*/
import { Base } from './base';

export type BaseOperation = Base;
/*
  Attributes from extended interfaces are accessible in this interface.
  
  BaseOperation <-- Base

      Base attributes:
        _id
        _rev
        type
        createdBy
        createdDate
        updatedBy
        updatedDate
        uploadedDate
        notes
        dataSource
        isDeleted
        legacy
        changeLog
*/
