import { Type } from '@angular/core';
import { mock, instance } from 'ts-mockito';
import { Candidate } from 'src/app/models/candidate';

const mockProvider = <T>(
  toMock: Type<T>,
  setupMock: (m: T) => void
): {
  provide: Type<T>;
  useFactory: () => T;
} => {
  const m = mock(toMock);
  setupMock(m);
  return { provide: toMock, useFactory: () => instance(m) };
};

const mockCandidate: Candidate = {
  id: 1,
  name: 'Juan',
  lastName: 'Pérez'
} as Candidate;

export { mockProvider, mockCandidate };
