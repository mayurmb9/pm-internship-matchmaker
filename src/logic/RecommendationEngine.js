import { supabase } from '../common/SupabaseConfig';

/**
 * Recommendation Engine for PM Internship Scheme
 * Algorithm:
 * - Location Match: 50%
 * - Skill Match: 30%
 * - Interest Match: 20%
 */

export const getRecommendations = async (userProfile) => {
  if (!userProfile) return [];

  try {
    // 1. Fetch all active internships from Supabase
    const { data: internships, error } = await supabase
      .from('internships')
      .select('*');

    if (error) {
      console.error('Error fetching internships:', error);
      return [];
    }

    if (!internships) return [];

    // 2. Rank internships
    const scoredInternships = internships.map((internship) => {
      let score = 0;

      // Location Match (50%)
      const userLoc = userProfile.location || "";
      const internLoc = internship.location || "";
      if (
        userLoc &&
        (internLoc.toLowerCase().includes(userLoc.toLowerCase()) ||
         userLoc.toLowerCase().includes(internLoc.toLowerCase()) ||
         internLoc.toLowerCase() === "remote")
      ) {
        score += 50;
      }

      // Skill Match (30%)
      const userSkills = userProfile.skills || [];
      const internSkills = internship.skills || [];
      if (userSkills.length > 0 && internSkills.length > 0) {
        const matchingSkills = internSkills.filter((skill) =>
          userSkills.some((userSkill) =>
            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(userSkill.toLowerCase())
          )
        );
        const skillScore = (matchingSkills.length / internSkills.length) * 30;
        score += skillScore;
      }

      // Interest Match (20%)
      const userInterests = userProfile.interests || [];
      const internInterests = internship.interests || [];
      if (userInterests.length > 0 && internInterests.length > 0) {
        const matchingInterests = internInterests.filter((interest) =>
          userInterests.some((userInterest) =>
            userInterest.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(userInterest.toLowerCase())
          )
        );
        const interestScore = (matchingInterests.length / internInterests.length) * 20;
        score += interestScore;
      }

      return { ...internship, matchScore: score };
    });

    // Sort by score and take top 5
    return scoredInternships
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  } catch (err) {
    console.error('Recommendation Engine exception:', err);
    return [];
  }
};
