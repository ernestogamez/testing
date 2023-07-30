import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('project.mapper specs', () => {
  // Test 1
  it('should return empty project when it feeds undefined', () => {
    // Arrange
    const project: apiModel.Project = undefined;

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  // Test 2
  it('should return empty project when it feeds null', () => {
    // Arrange
    const project: apiModel.Project = null;

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  // Test 3
  it('should return empty project when it feeds empty project', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  // Test 4
  it('should return one project with required values when it feeds one project with required values', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      isActive: true,
      employees: [{
        id: 'employee test id',
        employeeName: 'employee test employee name'
      }],
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      isActive: true,
      employees: [{
        id: 'employee test id',
        employeeName: 'employee test employee name'
      }],
    };

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  // Test 5
  it('should return one project with required and optional values when it feeds one project with required and optional values', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [{
        id: 'employee test id',
        employeeName: 'employee test employee name'
      }],
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [{
        id: 'employee test id',
        employeeName: 'employee test employee name'
      }],
    };

    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
