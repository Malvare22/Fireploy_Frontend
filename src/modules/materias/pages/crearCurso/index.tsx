import EditarCurso from '@modules/materias/components/editCurso'

/**
 * CreateCourseView component – a view for creating a new course.
 * This component renders the `EditarCurso` component in "create" mode, allowing users to input and submit details for a new course.
 * 
 * It encapsulates the course creation form and provides a user interface for managing course creation.
 * 
 * @component
 * 
 * @returns A JSX element that renders the course creation form via the `EditarCurso` component in "create" mode.
 * 
 * @example
 * ```tsx
 * <CreateCourseView />
 * ```
 */
function CreateCourseView() {
  return (
    <EditarCurso type='create'/>
  )
}

export default CreateCourseView