ActiveAdmin.register Comment do
  permit_params :comment

  index do
    id_column
    column :comment
    column :created_at
    column :updated_at
    actions
  end

  filter :comment
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :comment
    end
    f.actions
  end

end
