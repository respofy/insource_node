export default {
	request_success: 'მოთხოვნა შესრულდა წარმატებით',
	request_error: 'მოთხოვნა არ შესრულდა',
	auth: {
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
		user_not_activated: 'მომხმარებლის პროფილი არ არის გააქტიურებული'
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
        remove_company_from_favorites: 'კომპანია ფავორიტებიდან ამოიშალა წარმატებით'
	},
	model: {
		unique_phone_error: 'ანგარიში მსგავსი ტელეფონით უკვე არსებობს'
	},
	joi: {
		phone_required: 'ტელეფონის ნომრის შეყვანა აუცილებელია',
		phone_min_length: 'ტელეფონის ნომერი უნდა შედგებოდეს ცხრა სიმბოლოსაგან',
		is_number: 'zzz',
		date_valid: 'თარიღი არ არის სწორი',
		profession_required: 'პროფესიის არჩევა სავალდებულოა',
		company_name_required: 'კომპანიის სახელი სავალდებულოა',
		company_name_valid: 'კომპანიის სახელი არ არის ვალიდური'
	},
	middleware: {
		not_authorize: 'მომხმარებელი არ არის ავტორიზებული სისტემაში'
	},

	tokenGenerated: 'თოქენი დაგენერირდა წარმატებით',
	tokenNotGenerated: 'თოქენი არ დაგენერირდა',
	validEmailError: 'მეილი არ არის ვალიდური',
	invalidSmsCode: 'აქტივაციის კოდი არ არის სწორი ან ვადაგასულია'
}
