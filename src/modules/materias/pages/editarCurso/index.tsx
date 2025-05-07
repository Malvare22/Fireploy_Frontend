import EditarCurso from "@modules/materias/components/editCurso";

/**
 * EditCourseView component – a view for editing an existing course.
 * This component renders the `EditarCurso` component, passing a prop to indicate that the course should be edited.
 * 
 * It allows users to modify the details of an existing course by passing in the `type="edit"` prop to the `EditarCurso` component.
 * 
 * @component
 * 
 * @returns A JSX element that renders the `EditarCurso` component with the prop `type="edit"` to signify the course is being edited.
 * 
 * @example
 * ```tsx
 * <EditCourseView />
 * ```
 */
function EditCourseView() {
  return (
    <EditarCurso type="edit"/>
  )
}

export default EditCourseView