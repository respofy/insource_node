export default {
	request_success: 'მოთხოვნა შესრულდა წარმატებით',
	request_error: 'მოთხოვნა არ შესრულდა',
	phone_not_found: phone => {
		return `მომხმარებელი ნომრით ${phone} არ იქნა ნაპოვნი`
	},
	auth: {
		user_created: 'მომხმარებელი შეიქმნა',
		user_found: 'მომხმარებელი უკვე არსებობს ბაზაში',
		user_not_found: 'მომხმარებელი არ მოიძებნა',
		user_not_updated: 'მომხმარებლის მონაცემები ვერ განახლდა',
		user_password_reset: 'მომხმარებლის პაროლი შეიცვალა',
		user_initialized_successfully: 'მომხმარებლის ინიციალიზაცია დასრულდა წარმატებით',
		user_sms_verify_success: 'სმს კოდის ვერიფიკაცია დასრულდა წარმატებით',
		user_password_reset_initialized: 'პაროლის შეცვლის პროცესის ინიციალიზაცია დასრულდა წარმატებით',
		user_resend_sms_successfully: 'სმს ხელთავიდან გაიგავნა წარმატებით',
		verify_code_not_correct: 'ვერიფიკაციის კოდი არასწორია',
		user_was_registered: 'მომხმარებელი დარეგისტრირდა წარამტებით',
		user_not_activated: 'მომხმარებლის პროფილი არ არის გააქტიურებული',
		avatar_required: 'ავატარის ატვირთვა აუცილებელია',
		avatar_size_error: 'ავატარის ზომა აჭარბებს ლიმიტს'
	},
	company: {
		created: 'კომპანია შეიქმნა',
		create_error: 'კომპანიის შექმნისას დაფიქსირდა შეცდომა',
		logo_required: 'ლოგოს ატვირთვა სავალედბულოა',
		logo_size_error: 'ლოგოს ზომა აჭარბებს ლიმიტს',
		code_error: 'ვერიფიკაციის კოდი არასწორია',
		invited_user_error: 'მომხმარებელი არ მოიძებნა, საჭიროა ახალი ანგარიშის შექმნა',
		hash_error: 'ჰეში არასწორია ან ვადაგასული'
	},
	cv: {
		city_updated: 'ქალაქი განახლდა',
		city_not_updated: 'ქალაქი ვერ განახლდა',
		status_updated: 'სტატუსი განახლდა',
		status_not_updated: 'სტატუსი ვერ განახლდა',
		// working exp
		working_exp_created: 'სამუშაო გამოცდილება შეიქმნა',
		working_exp_create_error: 'სამუშაო გამოცდილება არ შეიქმნა',
		working_exp_updated: 'სამუშაო გამოცდილება განახლდა',
		working_exp_update_error: 'სამუშაო გამოცდილება ვერ განახლდა',
		working_exp_deleted: 'სამუშაო გამოცდილება წაიშალა',
		working_exp_deleted_error: 'სამუშაო გამოცდილების წაშლისას დაფიქსირდა შეცდომა',
		// languages
		user_language_created: 'ენა წარმატებით დაემატა',
		user_language_create_error: 'ენა არ დაემატა',
		user_language_updated: 'ენა განახლდა წარმატებით',
		user_language_update_error: 'ენის განახლებისას დაფიქსირდა შეცდომა',
		// education
		user_education_created: 'განათლება წარმატებით დაემატა',
		user_education_create_error: 'განათლება არ დაემატა, მსგავსი ჩანაწერი უვკე არსებობს',
		user_education_updated: 'განათლება განახლდა წარმატებით',
		user_education_update_error: 'განათლების განახლებისას დაფიქსირდა შეცდომა',
		user_education_deleted: 'განათლება წაიშალა წარმატებით',
		user_education_delete_error: 'განათლების წაშლისას მოხდა შეცდომა',
		// favorite company
		add_company_to_favorites: 'კომპანია დაემატა ფავორიტებში',
		add_company_favorites_error: 'კომპანია არ დაემატა',
		remove_company_from_favorites: 'კომპანია ფავორიტებიდან ამოიშალა წარმატებით',
		// certificate
		certificate_created: 'სერტიფიკატი დაემატა',
		certificate_create_error: 'სერტიფიკატი არ დაემატა',
		certificate_updated: 'სერტიფიკატი განახლდა',
		certificate_update_error: 'სერტიფიკატი არ განახლდა',
		certificate_deleted: 'სერტიფიკატი წაიშალა',
		certificate_delete_error: 'სერტიფიკატის წაშლისას დაფიქსირდა შეცდომა'
	},
	model: {
		unique_phone_error: 'ანგარიში მსგავსი ტელეფონით უკვე არსებობს',
		company: {
			identification_code_unique_error: 'საუიდენთიფიკაციო კოდი არ არის უნიკალური'
		}
	},
	job: {
		created: 'ვაკანსია შეიქმნა',
		create_error: 'ვაკანსიის შექმნისას დაფიქსირდა შეცდომა',
		deleted: 'ვაკანსია წაიშალა',
		delete_error: 'ვაკანსიის წაშლისას დაფიქსირდა შეცდომა',
		set_requirement_error: 'კრიტერიუმების დამატებისას დაფიქსირდა შეცდომა',
		archived: 'ვაკანსია დაარქივდა',
		archived_error: 'კომპანიის დაარქივებისას დაფიქსირდა შეცდომა'
	},
	joi: {
		phone_required: 'ტელეფონის ნომრის შეყვანა აუცილებელია',
		phone_min_length: 'ტელეფონის ნომერი უნდა შედგებოდეს ცხრა სიმბოლოსაგან',
		is_number: 'zzz',
		date_valid: 'თარიღი არ არის სწორი',
		profession_required: 'პროფესიის არჩევა სავალდებულოა',
		company_name_required: 'კომპანიის სახელი სავალდებულოა',
		company_name_valid: 'კომპანიის სახელი არ არის ვალიდური',
		invite_by_phone: 'აუცილებელია მინიმუმ ერთი ნომრის შეყვანა',
		industry_required: 'სფეროს არჩევა აუცილებელია',
		company_name: 'სახელის ველის შევსება სავალდებულოა, უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს',
		identification_code: 'საიდენტიფიკაციო კოდის შეყვანა სავალდებულოა, უნდა შეიცავდეს 9 სიმბოლოს',
		working_type_required: 'ვაკანსიის ტიპის არჩევა სავალდებულოა',
		city_required: 'ქალაქის არჩევა სავალდებულოა',
		role_required: 'თანამდებობის არჩევა სავალდებულოა',
		degree_required: 'განათლების ხარისხის არჩევა სავალდებულოა',
		language_required: 'ენის არჩევა სავალდებულოა',
		language_knowledge_required: 'ენის ცოდნის დონის არჩევა სავალდებულოა',
		job_title: 'სათაური არ არის ვალიდური, უნდა შეიცავდეს მინიმუმ 5 სიმბოლოს',
		salary_required: 'ხელფასის მითითება სავალდებულოა',
		experience_required: 'გამოცდილების მითითება აუცილებელია',
		skills_required: 'მიმართულებ(ებ)ის არჩევა სავალდებულოა',
		description_valid: 'აღწერა არ უნდა აღემატებოდეს 400 სიმბოლოს',
		skill_valid: 'მიმართულება არ არის ვალიდური, უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს'
	},
	middleware: {
		not_authorize: 'მომხმარებელი არ არის ავტორიზებული სისტემაში'
	},

	tokenGenerated: 'თოქენი დაგენერირდა წარმატებით',
	tokenNotGenerated: 'თოქენი არ დაგენერირდა',
	validEmailError: 'მეილი არ არის ვალიდური',
	invalidSmsCode: 'აქტივაციის კოდი არ არის სწორი ან ვადაგასულია'
}
