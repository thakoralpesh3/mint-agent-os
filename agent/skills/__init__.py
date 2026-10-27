"""
Marvel Series Skills Architecture for Aradhya AI Agent OS.
Provides modular, specialized capabilities modeled after Marvel artificial intelligences:
- FridayFightPatternSkill: Real-time attack vector pattern analysis and countermeasure calculation.
- EdithOrbitalReconSkill: Orbital network reconnaissance, target tracking, and drone defense strike.
- JarvisCadDiagnosticsSkill: 3D wireframe telemetry, power governors, and Cinnamon 60fps compositor stability.
- VisionMindStoneSkill: Mind Stone anomaly forecasting, digital antibodies, and ethical circuit breaking.
- KarenSuitMentorSkill: Suit modes, web shooter configurations, and interactive mentoring.
- JocastaElectronicWarfareSkill: Zero-trust electronic warfare, honeytoken tripwires, and egress containment.
"""

from .marvel_skills import (
    MarvelSkillsRegistry,
    FridayFightPatternSkill,
    EdithOrbitalReconSkill,
    JarvisCadDiagnosticsSkill,
    VisionMindStoneSkill,
    KarenSuitMentorSkill,
    JocastaElectronicWarfareSkill,
    marvel_skills
)
from .founder_skills import (
    FounderSkillsRegistry,
    founder_skills
)
from .replica_skills import (
    ReplicaSkillsRegistry,
    replica_skills
)

__all__ = [
    "MarvelSkillsRegistry",
    "FridayFightPatternSkill",
    "EdithOrbitalReconSkill",
    "JarvisCadDiagnosticsSkill",
    "VisionMindStoneSkill",
    "KarenSuitMentorSkill",
    "JocastaElectronicWarfareSkill",
    "marvel_skills",
    "FounderSkillsRegistry",
    "founder_skills",
    "ReplicaSkillsRegistry",
    "replica_skills"
]

