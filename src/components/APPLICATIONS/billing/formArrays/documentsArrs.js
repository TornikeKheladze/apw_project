export const docCatalogsArr = [
  { name: "name", label: "სახელი", type: "text" },
  { name: "parent_id", label: "მშობელი", type: "select", notRequired: true },
  { name: "org_id", label: "ორგანიზაცია", type: "select" },
  { name: "type", label: "ტიპი", type: "select", isId: true },
];

export const templatePackageArr = [
  {
    name: "template_package_name",
    label: "template package name",
    type: "text",
  },
  { name: "category_id", label: "კატეგორია", type: "select" },
];

export const templateArr = [
  { name: "template_name", label: "შაბლონის სახელი", type: "text" },
  { name: "cat_id", label: "კატეგორია", type: "select" },
  { name: "org_id", label: "ორგანიზაცია", type: "select" },
  // { name: "template_code", label: "კოდი", type: "text" },
];

export const editTemplateArr = [
  { name: "template_name", label: "შაბლონის სახელი", type: "text" },
  { name: "cat_id", label: "კატეგორია", type: "select" },
  { name: "org_id", label: "ორგანიზაცია", type: "select" },
  { name: "active", label: "აირჩიე სტატუსი", type: "select" },
  // { name: "template_code", label: "კოდი", type: "text" },
];

export const templateColumnsArr = [
  { name: "column_placeholder", label: "სახელი (placeholder)", type: "text" },
  { name: "column_marker", label: "მარკერი", type: "text" },
  { name: "column_type_id", label: "ტიპი", type: "select" },
  { name: "template_id", label: "შაბლონი", type: "select" },
];

export const templateColumnsInTemplatesArr = [
  { name: "column_placeholder", label: "სახელი (placeholder)", type: "text" },
  { name: "column_marker", label: "მარკერი", type: "text" },
  { name: "column_type_id", label: "ტიპი", type: "select" },
];

export const documentsArr = [
  { name: "document_name", label: "დოკუმენტის სახელი", type: "text" },
  { name: "cat_id", label: "კატეგორია", type: "text" },
  { name: "template_id", label: "შაბლონი", type: "select" },
];
