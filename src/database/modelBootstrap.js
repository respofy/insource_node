import Sequelize from 'sequelize'
import {} from 'dotenv/config'

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_CONNECTION,
	define: {
		underscored: true,
		timestamps: true
	},
	timezone: 'Asia/Tbilisi'
})

// pass your sequelize config here
import User from 'modules/users/models/User'
import Activation from 'modules/users/models/Activation'
import City from 'modules/users/models/City'
import Job from 'modules/company/models/Job'
import JobRequirement from 'modules/company/models/JobRequirement'
import JobUser from 'modules/company/models/JobUser'
import University from 'modules/users/models/University'
import UserEducation from 'modules/users/models/UserEducation'
import Degree from 'modules/users/models/Degree'
import Faculty from 'modules/users/models/Faculty'
import Language from 'modules/users/models/Language'
import LanguageKnowledge from 'modules/users/models/LanguageKnowledge'
import UserLanguage from 'modules/users/models/UserLanguage'
import UserProfession from 'modules/users/models/UserProfession'
import UserWorkingExperience from 'modules/users/models/UserWorkingExperience'
import UserCertificate from 'modules/users/models/UserCertificate'
import Industry from 'modules/users/models/Industry'
import Status from 'modules/users/models/Status'
import Profession from 'modules/users/models/Profession'
import Skill from 'modules/users/models/Skill'
import Role from 'modules/users/models/Role'
import WorkingType from 'modules/users/models/WorkingType'
import Salary from 'modules/users/models/Salary'
import UserRole from 'modules/users/models/UserRole'
import UserSkill from 'modules/users/models/UserSkill'
import UserIndustry from 'modules/users/models/UserIndustry'
import UserWorkingType from 'modules/users/models/UserWorkingType'
import Qualification from 'modules/users/models/Qualification'
import UserQualification from 'modules/users/models/UserQualification'

// Company
import Company from 'modules/company/models/Company'
import InviteHash from 'modules/company/models/InviteHash'
// Message
import Message from 'modules/message/models/Message'
import Meeting from 'modules/message/models/Meeting'

import seeder from './Seeder'
import factories from './factories'

const models = {
	User: User.init(sequelize, Sequelize),
	Activation: Activation.init(sequelize, Sequelize),
	City: City.init(sequelize, Sequelize),
	Status: Status.init(sequelize, Sequelize),
	Job: Job.init(sequelize, Sequelize),
	JobRequirement: JobRequirement.init(sequelize, Sequelize),
	JobUser: JobUser.init(sequelize, Sequelize),
	University: University.init(sequelize, Sequelize),
	UserEducation: UserEducation.init(sequelize, Sequelize),
	Degree: Degree.init(sequelize, Sequelize),
	Faculty: Faculty.init(sequelize, Sequelize),
	UserLanguage: UserLanguage.init(sequelize, Sequelize),
	UserProfession: UserProfession.init(sequelize, Sequelize),
	UserWorkingExperience: UserWorkingExperience.init(sequelize, Sequelize),
	UserCertificate: UserCertificate.init(sequelize, Sequelize),
	UserSkill: UserSkill.init(sequelize, Sequelize),
	Language: Language.init(sequelize, Sequelize),
	LanguageKnowledge: LanguageKnowledge.init(sequelize, Sequelize),
	Profession: Profession.init(sequelize, Sequelize),
	Skill: Skill.init(sequelize, Sequelize),
	Industry: Industry.init(sequelize, Sequelize),
	Role: Role.init(sequelize, Sequelize),
	Company: Company.init(sequelize, Sequelize),
	WorkingType: WorkingType.init(sequelize, Sequelize),
	Salary: Salary.init(sequelize, Sequelize),
	UserRole: UserRole.init(sequelize, Sequelize),
	UserIndustry: UserIndustry.init(sequelize, Sequelize),
	UserWorkingType: UserWorkingType.init(sequelize, Sequelize),
	Message: Message.init(sequelize, Sequelize),
	Qualification: Qualification.init(sequelize, Sequelize),
	UserQualification: UserQualification.init(sequelize, Sequelize),
	InviteHash: InviteHash.init(sequelize, Sequelize),
	Meeting: Meeting.init(sequelize, Sequelize)
}

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
	.filter(model => typeof model.associate === 'function')
	.forEach(model => model.associate(models))

if (process.env.DB_SEED_AND_MIGRATION == 'true')
	sequelize.sync().then(() => {
		// generate records that has no relations
		Promise.all([
			seeder.generateByCollection(db.Degree, factories.degrees),
			seeder.generateByCollection(db.WorkingType, factories.workingTypes, 2),
			seeder.generateByCollection(db.LanguageKnowledge, factories.languageKnowledges),
			seeder.generateByCollection(db.Status, factories.statuses)
		]).then(() => {
			// after generating records with no relations, generate records with relations
			seeder.generateMany(db.Qualification, factories.qualification, 5)
			seeder.generateMany(db.Industry, factories.industry, 5)
			seeder.generateMany(db.City, factories.city, 5)
			seeder.generateMany(db.Company, factories.company, 2)
			seeder.generateMany(db.Faculty, factories.faculty, 2)
			seeder.generateMany(db.Language, factories.language, 2)
			seeder.generateMany(db.Profession, factories.profession, 2)
			seeder.generateMany(db.Skill, factories.skill, 12)
			seeder.generateMany(db.Role, factories.role, 10)
			seeder.generateMany(db.University, factories.university, 2)
			seeder.generateMany(db.User, factories.user, 2)
		})
	})

const db = {
	...models,
	sequelize
}

export default db
