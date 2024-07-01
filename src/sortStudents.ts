export interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];
}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'grades',
}

// create SortOrder type
export type SortOrder = 'asc' | 'desc';

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  const arr = [...students];
  const isAsc = order === 'asc';

  if (sortBy === 'age') {
    return isAsc
      ? arr.sort((a: Student, b: Student) => a[sortBy] - b[sortBy])
      : arr.sort((a: Student, b: Student) => b[sortBy] - a[sortBy]);
  }

  if (sortBy === 'grades') {
    const avrGrade = (grades: number[]): number => {
      return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    };

    return isAsc
      ? arr.sort(
        (a: Student, b: Student) => avrGrade(a[sortBy]) - avrGrade(b[sortBy]),
      )
      : arr.sort(
        (a: Student, b: Student) => avrGrade(b[sortBy]) - avrGrade(a[sortBy]),
      );
  }

  if (sortBy === 'married') {
    return arr.sort((a: Student, b: Student) => {
      if (a[sortBy] === b[sortBy]) {
        return 0;
      }

      if (a[sortBy]) {
        return isAsc ? 1 : -1;
      }

      return isAsc ? -1 : 1;
    });
  }

  return isAsc
    ? arr.sort((a: Student, b: Student) => a[sortBy].localeCompare(b[sortBy]))
    : arr.sort((a: Student, b: Student) => b[sortBy].localeCompare(a[sortBy]));
}
