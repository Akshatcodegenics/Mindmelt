import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';
import Image from '../../../components/AppImage.jsx';
import Icon from '../../../components/AppIcon.jsx';

const ProfileSection = () => {
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Mental wellness enthusiast focused on mindful living and emotional balance.",
    wellnessGoals: "Reduce daily stress, improve sleep quality, practice mindfulness"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data in real app
  };

  return (
    <div className="bg-card organic-radius-lg soft-shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-fluid-xl font-heading font-semibold text-foreground">
          Profile Information
        </h2>
        {!isEditing &&
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
          iconName="Edit"
          iconPosition="left"
          iconSize={16}>

            Edit Profile
          </Button>
        }
      </div>
      <div className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 overflow-hidden organic-radius-lg">
              <Image
                src="https://images.unsplash.com/photo-1668911240686-fe09797b3043"
                alt="Professional headshot of woman with shoulder-length brown hair wearing white blouse"
                className="w-full h-full object-cover" />

            </div>
            {isEditing &&
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-primary-foreground organic-radius-md flex items-center justify-center soft-shadow-sm">
                <Icon name="Camera" size={14} />
              </button>
            }
          </div>
          <div>
            <h3 className="text-fluid-lg font-medium text-foreground">
              {profileData?.name}
            </h3>
            <p className="text-fluid-sm text-muted-foreground">
              Member since October 2024
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            value={profileData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            disabled={!isEditing}
            required />

          
          <Input
            label="Email Address"
            type="email"
            value={profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            required />

          
          <Input
            label="Phone Number"
            type="tel"
            value={profileData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing} />

        </div>

        <Input
          label="Bio"
          type="text"
          value={profileData?.bio}
          onChange={(e) => handleInputChange('bio', e?.target?.value)}
          disabled={!isEditing}
          description="Tell us a bit about yourself" />


        <Input
          label="Wellness Goals"
          type="text"
          value={profileData?.wellnessGoals}
          onChange={(e) => handleInputChange('wellnessGoals', e?.target?.value)}
          disabled={!isEditing}
          description="What are your mental wellness objectives?" />


        {/* Action Buttons */}
        {isEditing &&
        <div className="flex items-center space-x-3 pt-4">
            <Button
            variant="default"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            iconSize={16}>

              Save Changes
            </Button>
            <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}>

              Cancel
            </Button>
          </div>
        }
      </div>
    </div>);

};

export default ProfileSection;