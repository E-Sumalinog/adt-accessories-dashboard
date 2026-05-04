'use client'

import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import { User, Mail, MapPin, Calendar, Briefcase, Award, Download, ExternalLink } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">About Me</h1>
              <p className="text-gray-600 mt-1">Learn more about my background and expertise</p>
            </div>
            <UserDropdown />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="card p-6 text-center">
                <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-16 h-16 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">John Doe</h2>
                <p className="text-primary-600 font-medium mb-4">Full Stack Developer</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">john.doe@example.com</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">Available for hire</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Resume</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* Skills Overview */}
              <div className="card p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Overview</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Frontend</span>
                      <span className="text-sm text-gray-600">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Backend</span>
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Database</span>
                      <span className="text-sm text-gray-600">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">DevOps</span>
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Me */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About Me</h3>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-4">
                    I'm a passionate Full Stack Developer with over 5 years of experience building web applications 
                    and digital solutions. I specialize in creating scalable, performant applications that deliver 
                    exceptional user experiences.
                  </p>
                  <p className="mb-4">
                    My journey in tech started with a curiosity about how things work on the internet, which 
                    led me to pursue a career in software development. Since then, I've worked with various 
                    technologies and frameworks, always staying updated with the latest industry trends.
                  </p>
                  <p>
                    I believe in writing clean, maintainable code and creating solutions that not only meet 
                    technical requirements but also provide real value to users. When I'm not coding, you can 
                    find me exploring new technologies, contributing to open-source projects, or sharing my 
                    knowledge through technical writing.
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience</h3>
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">Senior Full Stack Developer</h4>
                      <p className="text-primary-600 mb-2">Tech Company Inc. • 2021 - Present</p>
                      <p className="text-gray-600">
                        Lead development of enterprise web applications, mentor junior developers, and 
                        architect scalable solutions. Increased application performance by 40% through 
                        optimization and refactoring.
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">Full Stack Developer</h4>
                      <p className="text-primary-600 mb-2">Digital Agency • 2019 - 2021</p>
                      <p className="text-gray-600">
                        Developed custom web solutions for clients across various industries. Implemented 
                        RESTful APIs, responsive frontends, and integrated third-party services.
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">Junior Developer</h4>
                      <p className="text-primary-600 mb-2">Startup Co. • 2018 - 2019</p>
                      <p className="text-gray-600">
                        Started my professional journey building features for SaaS products. Gained hands-on 
                        experience with modern web technologies and agile development methodologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">Bachelor of Science in Computer Science</h4>
                      <p className="text-primary-600 mb-2">University of Technology • 2014 - 2018</p>
                      <p className="text-gray-600">
                        Graduated with honors. Specialized in Software Engineering and Web Technologies. 
                        Dean's List for 3 consecutive semesters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Achievements & Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">AWS Certified Developer</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">Google Cloud Professional</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">Hackathon Winner 2022</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">Open Source Contributor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
